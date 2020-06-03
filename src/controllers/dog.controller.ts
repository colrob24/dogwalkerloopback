import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Dog} from '../models';
import {DogRepository} from '../repositories';

export class DogController {
  constructor(
    @repository(DogRepository)
    public dogRepository : DogRepository,
  ) {}

  @post('/dogs', {
    responses: {
      '200': {
        description: 'Dog model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dog)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dog, {
            title: 'NewDog',
            exclude: ['id'],
          }),
        },
      },
    })
    dog: Omit<Dog, 'id'>,
  ): Promise<Dog> {
    return this.dogRepository.create(dog);
  }

  @get('/dogs/count', {
    responses: {
      '200': {
        description: 'Dog model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Dog) where?: Where<Dog>,
  ): Promise<Count> {
    return this.dogRepository.count(where);
  }

  @get('/dogs', {
    responses: {
      '200': {
        description: 'Array of Dog model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Dog, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Dog) filter?: Filter<Dog>,
  ): Promise<Dog[]> {
    return this.dogRepository.find(filter);
  }

  @patch('/dogs', {
    responses: {
      '200': {
        description: 'Dog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dog, {partial: true}),
        },
      },
    })
    dog: Dog,
    @param.where(Dog) where?: Where<Dog>,
  ): Promise<Count> {
    return this.dogRepository.updateAll(dog, where);
  }

  @get('/dogs/{id}', {
    responses: {
      '200': {
        description: 'Dog model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dog, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Dog, {exclude: 'where'}) filter?: FilterExcludingWhere<Dog>
  ): Promise<Dog> {
    return this.dogRepository.findById(id, filter);
  }

  @patch('/dogs/{id}', {
    responses: {
      '204': {
        description: 'Dog PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dog, {partial: true}),
        },
      },
    })
    dog: Dog,
  ): Promise<void> {
    await this.dogRepository.updateById(id, dog);
  }

  @put('/dogs/{id}', {
    responses: {
      '204': {
        description: 'Dog PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dog: Dog,
  ): Promise<void> {
    await this.dogRepository.replaceById(id, dog);
  }

  @del('/dogs/{id}', {
    responses: {
      '204': {
        description: 'Dog DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dogRepository.deleteById(id);
  }
}
