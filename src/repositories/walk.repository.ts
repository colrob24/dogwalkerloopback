import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Walk, WalkRelations, Schedule} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ScheduleRepository} from './schedule.repository';

export class WalkRepository extends DefaultCrudRepository<
  Walk,
  typeof Walk.prototype.id,
  WalkRelations
> {

  public readonly schedule: BelongsToAccessor<Schedule, typeof Walk.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ScheduleRepository') protected scheduleRepositoryGetter: Getter<ScheduleRepository>,
  ) {
    super(Walk, dataSource);
    this.schedule = this.createBelongsToAccessorFor('schedule', scheduleRepositoryGetter,);
    this.registerInclusionResolver('schedule', this.schedule.inclusionResolver);
  }
}
