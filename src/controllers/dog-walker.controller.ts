import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {DogWalker} from '../models';
import {DogWalkerRepository} from '../repositories';

export class DogWalkerController {
  constructor(
    @repository(DogWalkerRepository)
    public dogWalkerRepository: DogWalkerRepository,
  ) {}

  @post('/dogwalkers', {
    responses: {
      '200': {
        description: 'DogWalker model instance',
        content: {'application/json': {schema: getModelSchemaRef(DogWalker)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DogWalker, {
            title: 'NewDogWalker',
            exclude: ['id'],
          }),
        },
      },
    })
    dogWalker: Omit<DogWalker, 'id'>,
  ): Promise<DogWalker> {
    return this.dogWalkerRepository.create(dogWalker);
  }

  @get('/dogwalkers/count', {
    responses: {
      '200': {
        description: 'DogWalker model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DogWalker) where?: Where<DogWalker>,
  ): Promise<Count> {
    return this.dogWalkerRepository.count(where);
  }

  @get('/dogwalkers', {
    responses: {
      '200': {
        description: 'Array of DogWalker model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DogWalker, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DogWalker) filter?: Filter<DogWalker>,
  ): Promise<DogWalker[]> {
    return this.dogWalkerRepository.find(filter);
  }

  @patch('/dogwalkers', {
    responses: {
      '200': {
        description: 'DogWalker PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DogWalker, {partial: true}),
        },
      },
    })
    dogWalker: DogWalker,
    @param.where(DogWalker) where?: Where<DogWalker>,
  ): Promise<Count> {
    return this.dogWalkerRepository.updateAll(dogWalker, where);
  }

  @get('/dogwalkers/{id}', {
    responses: {
      '200': {
        description: 'DogWalker model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DogWalker, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DogWalker, {exclude: 'where'}) filter?: FilterExcludingWhere<DogWalker>
  ): Promise<DogWalker> {
    return this.dogWalkerRepository.findById(id, filter);
  }

  @patch('/dogwalkers/{id}', {
    responses: {
      '204': {
        description: 'DogWalker PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DogWalker, {partial: true}),
        },
      },
    })
    dogWalker: DogWalker,
  ): Promise<void> {
    await this.dogWalkerRepository.updateById(id, dogWalker);
  }

  @put('/dogwalkers/{id}', {
    responses: {
      '204': {
        description: 'DogWalker PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dogWalker: DogWalker,
  ): Promise<void> {
    await this.dogWalkerRepository.replaceById(id, dogWalker);
  }

  @del('/dogwalkers/{id}', {
    responses: {
      '204': {
        description: 'DogWalker DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dogWalkerRepository.deleteById(id);
  }
}
