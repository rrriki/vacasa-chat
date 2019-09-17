import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';
import {User} from '../../../../typing/user.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User;
  private jwtHelper: JwtHelperService;

  constructor(private httpClient: HttpClient, private router: Router) {
    // Validate if a the user is logged when the page is refresh
    this.jwtHelper = new JwtHelperService();

    if (this.isAuthenticated()) {
      const token = AuthService.getToken();
      const {user} = this.jwtHelper.decodeToken(token);
      this.currentUser = user;
    } else {
      this.currentUser = Object.create(null);
    }
  }

  /** Helper method to retrieve token from localStorage **/
  static getToken(): string {
    return localStorage.getItem('jwt_token');
  }

  login(email: string, password: string) {
    return this.httpClient.post(`${environment.api_url}/auth`, {email, password})
      .pipe(tap(
        async (authResults) => {
          this.setSession(authResults);
          await this.router.navigate(['/home']);
        },
        (err) => {
          console.log(err);
        })
      );
  }

  async logout() {
    this.currentUser = null;
    localStorage.removeItem('jwt_token');
    await this.router.navigate(['/user/login']);
  }

  public getLoggedUser() {
    return this.currentUser;
  }

  /** Helper method to validate token status and expiration **/
  public isAuthenticated(): boolean {
    const token = AuthService.getToken();
    if (!token) {
      return false;
    }
    const decoded = this.jwtHelper.decodeToken(token);
    const expiresIn = moment.unix(decoded.exp);
    return moment().isBefore(expiresIn);
  }

  /**
   * Helper function to extract and set the user & token from an auth request
   * @param authResults - The result from an auth request signIn/register
   */
  private setSession(authResults) {
    const {data: {token}} = authResults;
    const {user} = this.jwtHelper.decodeToken(token);
    this.currentUser = user;
    localStorage.setItem('jwt_token', token);
  }

}
