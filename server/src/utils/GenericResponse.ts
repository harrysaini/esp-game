import Status from './Status';
import _ from 'lodash';

export interface IGenericResponse<T = any, U = any> {
  status: Status;
  data?: T;
  error?: U;
}

export class GenericResponse<T, U = any> implements IGenericResponse<T, U>  {
  public status: Status;
  public data?: T;
  public error?: U;

  constructor(statusCode: number, statusMsg: string, data?: T, error?: U) {
    this.status = new Status(statusCode, statusMsg);
    if (!(_.isUndefined(data) || _.isNull(data))) {
      this.data = data;
    }
    if (!(_.isUndefined(error) || _.isNull(error))) {
      this.error = error;
    }
  }
}
