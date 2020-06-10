import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Schedule, ScheduleRelations, Walk} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {WalkRepository} from './walk.repository';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.id,
  ScheduleRelations
> {

  public readonly walks: HasManyRepositoryFactory<Walk, typeof Schedule.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('WalkRepository') protected walkRepositoryGetter: Getter<WalkRepository>,
  ) {
    super(Schedule, dataSource);
    this.walks = this.createHasManyRepositoryFactoryFor('walks', walkRepositoryGetter,);
    this.registerInclusionResolver('walks', this.walks.inclusionResolver);
  }
}
