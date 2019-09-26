import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../../../../typing/user.interface';

const {api_url} = environment;

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user): Observable<User> {
    return this.http.post<User>(`${api_url}/users/`, user);
  }
}
