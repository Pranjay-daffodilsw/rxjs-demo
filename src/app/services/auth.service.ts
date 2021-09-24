import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiKeys } from "../apiKeys";
import { AuthLoginResponseData } from "../models/authLoginResponseData.model";
import { AuthSignupResponseData } from "../models/authSignupResponseData.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {

  }

  login(email: string, password: string): Observable<AuthLoginResponseData> {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiKeys.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ) as Observable<AuthLoginResponseData>;
  }

  signUp(email: string, password: string): Observable<AuthSignupResponseData> {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKeys.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ) as Observable<AuthSignupResponseData>;
  }

  formatUser(data: AuthLoginResponseData | AuthSignupResponseData) {
    const expirationDate = new Date((new Date).getTime() + Number(data.expiresIn) * 1000)
    const user = new User(
      data.idToken,
      data.email,
      data.refreshToken,
      data.localId,
      expirationDate
    )
    return user;
  }

  formatSignupErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account';
      case 'OPERATION_NOT_ALLOWED':
        return 'Please contact support';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests from this device due to unusual activity. Try again later.'
      default:
        return 'An error has occured.\nPlease try again and if the error persist please contact support';
    }
  }

  formatLoginErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'No account present for the provided email';
      case 'INVALID_PASSWORD':
        return 'Entered password is not valid';
      case 'USER_DISABLED':
        return 'The given account has been disabled please contact support'
      default:
        return 'An error has occured.\nPlease try again and if the error persist please contact support';
    }
  }


}