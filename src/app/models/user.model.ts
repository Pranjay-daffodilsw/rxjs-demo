export class User {
  constructor(
    private idToken: string,
    private email: string,
    private refreshToken: string,
    private localId: string,
    private expirationDate: Date,
  ) { }
}