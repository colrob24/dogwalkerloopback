import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DogWalker, DogWalkerRelations, ContactDetails} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ContactDetailsRepository} from './contact-details.repository';

export class DogWalkerRepository extends DefaultCrudRepository<
  DogWalker,
  typeof DogWalker.prototype.id,
  DogWalkerRelations
> {

  public readonly contactDetails: BelongsToAccessor<ContactDetails, typeof DogWalker.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ContactDetailsRepository') protected contactDetailsRepositoryGetter: Getter<ContactDetailsRepository>,
  ) {
    super(DogWalker, dataSource);
    this.contactDetails = this.createBelongsToAccessorFor('contactDetails', contactDetailsRepositoryGetter,);
    this.registerInclusionResolver('contactDetails', this.contactDetails.inclusionResolver);
  }
}
