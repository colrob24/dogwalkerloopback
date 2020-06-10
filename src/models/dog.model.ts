import {Entity, model, property} from '@loopback/repository';

@model()
export class Dog extends Entity {
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
  FirstName: string;

  @property({
    type: 'string',
    required: true,
  })
  LastName: string;

  @property({
    type: 'string',
    required: true,
  })
  Size: string;

  @property({
    type: 'string',
    required: true,
  })
  Breed: string;

  @property({
    type: 'number',
    required: true,
  })
  YearOfBirth: number;

  @property({
    type: 'boolean',
    required: true,
  })
  AllowedOffLeash: boolean;

  @property({
    type: 'boolean',
  })
  Vaccinated?: boolean;


  constructor(data?: Partial<Dog>) {
    super(data);
  }
}

export interface DogRelations {
  // describe navigational properties here
}

export type DogWithRelations = Dog & DogRelations;
