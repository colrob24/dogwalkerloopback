import {Entity, model, property} from '@loopback/repository';

@model()
export class DogWalker extends Entity {
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
    type: 'number',
    required: true,
  })
  MaxDogs: number;

  @property({
    type: 'boolean',
    required: true,
  })
  Active: boolean;


  constructor(data?: Partial<DogWalker>) {
    super(data);
  }
}

export interface DogWalkerRelations {
  // describe navigational properties here
}

export type DogWalkerWithRelations = DogWalker & DogWalkerRelations;
