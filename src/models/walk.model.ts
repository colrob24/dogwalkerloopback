import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Schedule} from './schedule.model';

@model()
export class Walk extends Entity {
  @property({
    type: 'any',
    id: true,
    generated: true,
  })
  id?: any;

  @property({
    type: 'number',
    required: true,
  })
  dayOfWeek: number;

  @property({
    type: 'string',
    required: true,
  })
  startTime: string;

  @property({
    type: 'string',
    required: true,
  })
  endTime: string;

  @property({
    type: 'number',
    required: true,
  })
  NumberOfSlots: number;

  @belongsTo(() => Schedule)
  scheduleId: number;

  constructor(data?: Partial<Walk>) {
    super(data);
  }
}

export interface WalkRelations {
  // describe navigational properties here
}

export type WalkWithRelations = Walk & WalkRelations;
