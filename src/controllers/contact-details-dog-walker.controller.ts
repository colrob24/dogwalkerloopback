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
  ContactDetails,
  DogWalker,
} from '../models';
import {ContactDetailsRepository} from '../repositories';

export class ContactDetailsDogWalkerController {
  constructor(
    @repository(ContactDetailsRepository) protected contactDetailsRepository: ContactDetailsRepository,
  ) { }

  @get('/contact-details/{id}/dog-walker', {
    responses: {
      '200': {
        description: 'ContactDetails has one DogWalker',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DogWalker),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DogWalker>,
  ): Promise<DogWalker> {
    return this.contactDetailsRepository.dogWalker(id).get(filter);
  }

  @post('/contact-details/{id}/dog-walker', {
    responses: {
      '200': {
        description: 'ContactDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(DogWalker)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ContactDetails.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DogWalker, {
            title: 'NewDogWalkerInContactDetails',
            exclude: ['id'],
            optional: ['contactDetailsId']
          }),
        },
      },
    }) dogWalker: Omit<DogWalker, 'id'>,
  ): Promise<DogWalker> {
    return this.contactDetailsRepository.dogWalker(id).create(dogWalker);
  }

  @patch('/contact-details/{id}/dog-walker', {
    responses: {
      '200': {
        description: 'ContactDetails.DogWalker PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DogWalker, {partial: true}),
        },
      },
    })
    dogWalker: Partial<DogWalker>,
    @param.query.object('where', getWhereSchemaFor(DogWalker)) where?: Where<DogWalker>,
  ): Promise<Count> {
    return this.contactDetailsRepository.dogWalker(id).patch(dogWalker, where);
  }

  @del('/contact-details/{id}/dog-walker', {
    responses: {
      '200': {
        description: 'ContactDetails.DogWalker DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DogWalker)) where?: Where<DogWalker>,
  ): Promise<Count> {
    return this.contactDetailsRepository.dogWalker(id).delete(where);
  }
}
