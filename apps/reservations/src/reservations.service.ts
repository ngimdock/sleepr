import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
  ) {}

  async create(userId: string, createReservationDto: CreateReservationDto) {
    return this.paymentService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map(async (paymentResponse) => {
          console.log({ paymentResponse });

          const reservation = await this.reservationRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId,
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
