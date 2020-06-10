import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Walk,
  Schedule,
} from '../models';
import {WalkRepository} from '../repositories';

export class WalkScheduleController {
  constructor(
    @repository(WalkRepository)
    public walkRepository: WalkRepository,
  ) { }

  @get('/walks/{id}/schedule', {
    responses: {
      '200': {
        description: 'Schedule belonging to Walk',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Schedule)},
          },
        },
      },
    },
  })
  async getSchedule(
    @param.path.any('id') id: typeof Walk.prototype.id,
  ): Promise<Schedule> {
    return this.walkRepository.schedule(id);
  }
}
