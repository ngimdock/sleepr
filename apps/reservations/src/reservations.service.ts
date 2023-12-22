import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
  UserInterface,
} from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentsServiceClient;
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentsService = this.client.getService<PaymentsServiceClient>(
      PAYMENTS_SERVICE_NAME,
    );
  }

  async create(
    createReservationDto: CreateReservationDto,
    user: UserInterface,
  ) {
    return this.paymentsService
      .createCharge({ ...createReservationDto.charge, user })
      .pipe(
        map(async (paymentResponse) => {
          const reservation = await this.reservationRepository.create({
            ...createReservationDto,
            invoceId: paymentResponse.id,
            timestamp: new Date(),
            userId: user.id,
          });

          return reservation;
        }),
      );
  }

  findAll() {
    return this.reservationRepository.findAll({});
  }

  findOne(id: string) {
    return this.reservationRepository.findOne({ id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return this.reservationRepository.findOneAndDelete({ id });
  }
}
