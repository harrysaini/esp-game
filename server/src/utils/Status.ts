
export enum SERVICE_STATUS {
  BAD_REQUEST = 1,
  SUCCESS = 0,
  FAILED = 6,
  PARTIAL = 7,
  RESOURCE_NOT_FOUND = 2
}

export enum RESPONSE_STATUS {
  FAILED = 1,
  PARTIAL = 7,
  SUCCESS = 0
}

export enum RESPONSE_MESSAGE {
  SUCCESS = 'Success'
}

export enum HTTP_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  SERVER_NOT_FOUND = 404,
  PRECON_FAIL = 412,
  INTERNAL_SERVER_ERROR = 500
}

export interface IStatus {
  code: SERVICE_STATUS | RESPONSE_STATUS ;
  message: string;
}

class Status implements IStatus {
  public code: SERVICE_STATUS | RESPONSE_STATUS = SERVICE_STATUS.SUCCESS;
  public message: string = '';

  constructor(code?: SERVICE_STATUS | RESPONSE_STATUS, message?: string) {
    this.code = code || SERVICE_STATUS.SUCCESS;
    this.message = message || '';
  }

}

export default Status;
