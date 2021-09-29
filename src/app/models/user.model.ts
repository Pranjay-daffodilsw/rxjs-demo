export class User {
  constructor(
    private idToken: string,
    private email: string,
    private refreshToken: string,
    private localId: string,
    private expirationDate: Date,
  ) { }

  get expireDate(): Date {
    return this.expirationDate
  }

  get userToken(): string {
    return this.idToken;
  }
}