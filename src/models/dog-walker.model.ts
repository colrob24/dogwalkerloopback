import {Entity, model, property} from '@loopback/repository';

@model()
export class DogWalker extends Entity {
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
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<DogWalker>) {
    super(data);
  }
}

export interface DogWalkerRelations {
  // describe navigational properties here
}

export type DogWalkerWithRelations = DogWalker & DogWalkerRelations;
