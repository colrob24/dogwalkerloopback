import {DefaultCrudRepository} from '@loopback/repository';
import {Dog, DogRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DogRepository extends DefaultCrudRepository<
  Dog,
  typeof Dog.prototype.id,
  DogRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Dog, dataSource);
  }
}
