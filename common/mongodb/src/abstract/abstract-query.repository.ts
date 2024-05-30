import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';

import { AbstractEntity } from './abstract.entity';
import { AbstractMapper } from './abstract.mapper';
import { AbstractModel } from './abstract.model';

export abstract class AbstractQueryRepository<
  TEntity extends AbstractEntity,
  TModel extends AbstractModel,
  TMapper extends AbstractMapper<TEntity, TModel>,
> {
  public constructor(
    protected readonly entity: Model<TEntity>,
    protected readonly mapper: TMapper,
  ) {}

  private readonly logger = new Logger(AbstractQueryRepository.name);

  public async findMany(filterQuery: FilterQuery<TEntity> = {}): Promise<TModel[]> {
    const entities = await this.entity.find(filterQuery).lean();
    return entities.map(entity => this.mapper.mapEntityToModel(entity as TEntity));
  }

  public async findOne(filterQuery: FilterQuery<TEntity>): Promise<TModel | null> {
    const entity = await this.entity.findOne(filterQuery).lean();
    return entity ? this.mapper.mapEntityToModel(entity as TEntity) : null;
  }

  public async findOneOrFail(filterQuery: FilterQuery<TEntity>): Promise<TModel> {
    const entity = await this.findOne(filterQuery);

    if (!entity) {
      this.logger.error(`${this.entity.modelName} not found!`, JSON.stringify(filterQuery));
      throw new NotFoundException(`${this.entity.modelName} not found!`);
    }

    return entity;
  }

  public async checkIfExists(filterQuery: FilterQuery<TEntity>): Promise<boolean> {
    return !!(await this.entity.exists(filterQuery));
  }
}
