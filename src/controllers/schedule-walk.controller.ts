import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Schedule,
  Walk,
} from '../models';
import {ScheduleRepository} from '../repositories';

export class ScheduleWalkController {
  constructor(
    @repository(ScheduleRepository) protected scheduleRepository: ScheduleRepository,
  ) { }

  @get('/schedules/{id}/walks', {
    responses: {
      '200': {
        description: 'Array of Schedule has many Walk',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Walk)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Walk>,
  ): Promise<Walk[]> {
    return this.scheduleRepository.walks(id).find(filter);
  }

  @post('/schedules/{id}/walks', {
    responses: {
      '200': {
        description: 'Schedule model instance',
        content: {'application/json': {schema: getModelSchemaRef(Walk)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Schedule.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Walk, {
            title: 'NewWalkInSchedule',
            exclude: ['id'],
            optional: ['scheduleId']
          }),
        },
      },
    }) walk: Omit<Walk, 'id'>,
  ): Promise<Walk> {
    return this.scheduleRepository.walks(id).create(walk);
  }

  @patch('/schedules/{id}/walks', {
    responses: {
      '200': {
        description: 'Schedule.Walk PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Walk, {partial: true}),
        },
      },
    })
    walk: Partial<Walk>,
    @param.query.object('where', getWhereSchemaFor(Walk)) where?: Where<Walk>,
  ): Promise<Count> {
    return this.scheduleRepository.walks(id).patch(walk, where);
  }

  @del('/schedules/{id}/walks', {
    responses: {
      '200': {
        description: 'Schedule.Walk DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Walk)) where?: Where<Walk>,
  ): Promise<Count> {
    return this.scheduleRepository.walks(id).delete(where);
  }
}
