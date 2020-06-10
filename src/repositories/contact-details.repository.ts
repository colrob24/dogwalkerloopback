import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {ContactDetails, ContactDetailsRelations, DogWalker} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DogWalkerRepository} from './dog-walker.repository';

export class ContactDetailsRepository extends DefaultCrudRepository<
  ContactDetails,
  typeof ContactDetails.prototype.id,
  ContactDetailsRelations
> {

  public readonly dogWalker: HasOneRepositoryFactory<DogWalker, typeof ContactDetails.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DogWalkerRepository') protected dogWalkerRepositoryGetter: Getter<DogWalkerRepository>,
  ) {
    super(ContactDetails, dataSource);
    this.dogWalker = this.createHasOneRepositoryFactoryFor('dogWalker', dogWalkerRepositoryGetter);
    this.registerInclusionResolver('dogWalker', this.dogWalker.inclusionResolver);
  }
}
