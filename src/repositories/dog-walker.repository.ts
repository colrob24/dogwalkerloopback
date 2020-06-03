import {DefaultCrudRepository} from '@loopback/repository';
import {DogWalker, DogWalkerRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DogWalkerRepository extends DefaultCrudRepository<
  DogWalker,
  typeof DogWalker.prototype.id,
  DogWalkerRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(DogWalker, dataSource);
  }
}
