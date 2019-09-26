import { Component } from '@angular/core';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faUser = faUser;
  faSignOut = faSignOutAlt;

  constructor(private auth: AuthService) { }

  async logOut() {
    console.log('Logging user out');
    await this.auth.logout();
  }

}
