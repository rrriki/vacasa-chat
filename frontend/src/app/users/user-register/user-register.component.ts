import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';

import {ToastrService} from 'ngx-toastr';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;

  isMouseOverSubmit: boolean;

  newUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.minLength(8),
        Validators.maxLength(20),
      ]],
      profilePhoto: ['', Validators.required],
    });
  }

  onPhotoInputChange(event) {
    const file = event.target.files[0];
    const profilePhoto = document.getElementById('profile-photo') as HTMLImageElement;

    this.newUserForm.patchValue({profilePhoto: file});

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      profilePhoto.src = reader.result.toString();
    };
  }

  registerUser(formValues: object) {

    const data = new FormData();

    const fields = Object.keys(formValues);
    for (const field of fields) {
      if (field === 'profilePhoto') {
        const file: File = formValues[field];
        data.append(field, file, file.name);
      } else {
        data.append(field, formValues[field]);
      }
    }

    this.userService.createUser(data).subscribe(async (res) => {
      this.toastr.success('Please, login now.', 'User created!');
      await this.router.navigate(['/users/login']);
    }, (e) => {
      const message = e.error.message || e.message;
      this.toastr.error(message, 'Error creating user');
    });
  }

  async cancel() {
    this.toastr.success('register created');
    await this.router.navigate(['/home']);
  }
}
