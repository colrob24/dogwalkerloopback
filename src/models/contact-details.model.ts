import {Entity, model, property, hasOne} from '@loopback/repository';
import {DogWalker} from './dog-walker.model';

@model()
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

  @hasOne(() => DogWalker)
  dogWalker: DogWalker;

  constructor(data?: Partial<ContactDetails>) {
    super(data);
  }
}

export interface ContactDetailsRelations {
  // describe navigational properties here
}

export type ContactDetailsWithRelations = ContactDetails & ContactDetailsRelations;
