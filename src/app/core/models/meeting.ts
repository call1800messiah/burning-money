import { Person } from "@app/core";

export class Meeting {
  constructor(
    public name: string,
    public people?: Person[],
    public startTime?: Date,
    public endTime?: Date,
    public id?: string,
    public episodes?: Array<{ startTime: Date, endTime: Date }>
  ) {}
}
