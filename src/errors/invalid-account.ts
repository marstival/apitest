export class InvalidAccountException extends Error {
  statusCode = 404;
  returnContent = '0';

  constructor(public message: string) {
    super(message);

    // extending a built in class
    Object.setPrototypeOf(this, InvalidAccountException.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
