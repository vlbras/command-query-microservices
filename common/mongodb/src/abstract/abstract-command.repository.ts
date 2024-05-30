import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { AbstractEntity } from './abstract.entity';
import { AbstractMapper } from './abstract.mapper';
import { AbstractModel } from './abstract.model';

export abstract class AbstractCommandRepository<
  TEntity extends AbstractEntity,
  TModel extends AbstractModel,
  TMapper extends AbstractMapper<TEntity, TModel>,
> {
  public constructor(
    protected readonly entity: Model<TEntity>,
    protected readonly mapper: TMapper,
  ) {}

  private readonly logger = new Logger(AbstractCommandRepository.name);

  public async create(data: Omit<TEntity, '_id'>): Promise<TModel> {
    try {
      const newEntity = await this.entity.create(data);
      return this.mapper.mapEntityToModel(newEntity);
    } catch (err) {
      if (err.code === 11000) {
        this.logger.error(`${this.entity.modelName} already exists!`, JSON.stringify(data));
        throw new ConflictException(`${this.entity.modelName} already exists!`);
      }

      this.logger.error(err.message);
      throw err;
    }
  }

  public async updateOne(filterQuery: FilterQuery<TEntity>, data: UpdateQuery<TEntity>): Promise<TModel> {
    try {
      const entity = await this.entity.findOneAndUpdate(filterQuery, data, {
        lean: true,
        new: true,
      });

      if (!entity) {
        this.logger.error(`${this.entity.modelName} not found!`, JSON.stringify(filterQuery));
        throw new NotFoundException(`${this.entity.modelName} not found!`);
      }

      return this.mapper.mapEntityToModel(entity as TEntity);
    } catch (err) {
      if (err.code === 11000) {
        this.logger.error(`${this.entity.modelName} already exists!`, JSON.stringify(data));
        throw new ConflictException(`${this.entity.modelName} already exists!`);
      }

      this.logger.error(err.message);
      throw err;
    }
  }

  public async deleteOne(filterQuery: FilterQuery<TEntity>): Promise<void> {
    const { deletedCount } = await this.entity.deleteOne(filterQuery);

    if (!deletedCount) {
      this.logger.error(`${this.entity.modelName} not found!`, JSON.stringify(filterQuery));
      throw new NotFoundException(`${this.entity.modelName} not found!`);
    }
  }

  public async deleteMany(filterQuery: FilterQuery<TEntity>): Promise<void> {
    await this.entity.deleteMany(filterQuery);
  }
}
