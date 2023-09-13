import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  create(userId: string, createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
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
