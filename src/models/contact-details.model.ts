import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_contactDetails_dogwalkerId: {
        name: 'fk_contactDetails_dogwalkerId',
        entity: 'dog-walker',
        entityKey: 'id',
        foreignKey: 'DogWalkerId',
      },
    },
  },
})
export class ContactDetails extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Mobile: string;

  @property({
    type: 'string',
    required: true,
  })
  AddressLine1: string;

  @property({
    type: 'string',
  })
  AddressLine2?: string;

  @property({
    type: 'string',
    required: true,
  })
  City: string;

  @property({
    type: 'string',
    required: true,
  })
  Postcode: string;

  @property({
    type: 'number',
    required: true,
  })
  DogWalkerId: number;


  constructor(data?: Partial<ContactDetails>) {
    super(data);
  }
}

export interface ContactDetailsRelations {
  // describe navigational properties here
}

export type ContactDetailsWithRelations = ContactDetails & ContactDetailsRelations;
