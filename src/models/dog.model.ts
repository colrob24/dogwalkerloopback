import {Entity, model, property} from '@loopback/repository';

@model()
export class Dog extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
  })
  size?: string;

  @property({
    type: 'string',
  })
  breed?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  allowedOffLead: boolean;

  @property({
    type: 'number',
    required: true,
  })
  birthYear: number;

  @property({
    type: 'boolean',
    required: true,
  })
  vacineProofSeen: boolean;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<Dog>) {
    super(data);
  }
}

export interface DogRelations {
  // describe navigational properties here
}

export type DogWithRelations = Dog & DogRelations;
