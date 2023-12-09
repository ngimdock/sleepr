import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE, UserInterface } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    user: UserInterface,
  ) {
    return this.paymentService
      .send('create_charge', { ...createReservationDto.charge, user })
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
