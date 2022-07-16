import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

export type Moment = moment.Moment;

export class CommonUtil {

  constructor() {}
  getuuidv4(): string {
    return uuidv4();
  }
  getCurrentDate(): string {
    return moment().format();
  }
  getDateObject(date: string | Date): string {
    return moment(date).format();
  }
}