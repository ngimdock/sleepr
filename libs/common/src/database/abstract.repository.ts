import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, 'id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      id: randomUUID(),
      ...document,
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery);

    if (!document) {
      this.logger.warn('Document not found with filterQuery: ', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = this.model.findByIdAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery: ', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findAll(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
