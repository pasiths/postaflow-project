export enum ErrorCode {
  INTERNAL_EXCEPTION = 100,
  USER_ALREADY_EXISTS = 101,
  PASSWORD_MISMATCH = 102,
  USER_NOT_FOUND = 103,
  INVALID_CREDENTIALS = 104,
  ACCOUNT_INACTIVE = 105,
  ACCOUNT_PENDING = 106,
  TOKEN_REQUIRED = 107,
  INVALID_TOKEN = 108,
  CUSTOMER_ALREADY_EXISTS = 109,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}
