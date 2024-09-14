export class BaseDto<Type> {
  public readonly message: string;

  public readonly data: Type | Type[] | null;

  constructor(message: string, data: Type | Type[] | null) {
    this.message = message;
    this.data = data;
  }
}
