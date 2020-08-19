import { IUser } from '@/shared/model/user.model';

export const enum Status {
  OPEN = 'Open',
  WAITING_FOR_RESPONSE = 'Waiting for Customer Response',
  CLOSED = 'Closed',
  DUPLICATE = 'Duplicate',
  IN_PROGRESS = 'In Progress',
  REOPENED = 'Reopened',
  CANNOT_REPRODUCE = 'Cannot Reproduce',
  SOLVED = 'Solved',
  WONT_IMPLEMENT = 'Won&#39;t Implement',
  VERIFIED = 'Verified',
}

export const enum Type {
  BUG = 'Bug',
  FEATURE = 'Feature',
}

export const enum Priority {
  HIGHEST = 'Highest',
  HIGHER = 'Higher',
  HIGH = 'High',
  NORMAL = 'Normal',
  LOW = 'Low',
  LOWER = 'Lower',
  LOWERST = 'Lowest',
}

export interface ITicket {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: Date;
  date?: Date;
  status?: Status;
  type?: Type;
  priority?: Priority;
  assignedTo?: IUser;
  reportedBy?: IUser;
}

export class Ticket implements ITicket {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public dueDate?: Date,
    public date?: Date,
    public status?: Status,
    public type?: Type,
    public priority?: Priority,
    public assignedTo?: IUser,
    public reportedBy?: IUser
  ) {}
}
