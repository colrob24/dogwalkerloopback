import {DefaultCrudRepository} from '@loopback/repository';
import {ContactDetails, ContactDetailsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContactDetailsRepository extends DefaultCrudRepository<
  ContactDetails,
  typeof ContactDetails.prototype.id,
  ContactDetailsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ContactDetails, dataSource);
  }
}
