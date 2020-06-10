import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DogWalker,
  ContactDetails,
} from '../models';
import {DogWalkerRepository} from '../repositories';

export class DogWalkerContactDetailsController {
  constructor(
    @repository(DogWalkerRepository)
    public dogWalkerRepository: DogWalkerRepository,
  ) { }

  @get('/dog-walkers/{id}/contact-details', {
    responses: {
      '200': {
        description: 'ContactDetails belonging to DogWalker',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ContactDetails)},
          },
        },
      },
    },
  })
  async getContactDetails(
    @param.path.number('id') id: typeof DogWalker.prototype.id,
  ): Promise<ContactDetails> {
    return this.dogWalkerRepository.contactDetails(id);
  }
}
