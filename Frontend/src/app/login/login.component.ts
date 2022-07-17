import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  User = {
    email: '',
    password: '',
  };

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    if (this._auth.isLoggedIn()) {
      this._router.navigate([localStorage.getItem("url")]);
    }
  }
  Verify = () => {
    const x: string = this.User.password.slice(3, 6).toLowerCase();
    if (x === 'stu') {
      this._auth.studentcheck(this.User).subscribe((data) => {
        const info = JSON.parse(JSON.stringify(data));
        localStorage.setItem('token', info.token);
        localStorage.setItem('url', `/student/${info.data}/`);
        this._router.navigate(['/student/', info.data]);
      });
    } else if (x === 'mod') {
      this._auth.moderatorcheck(this.User).subscribe((data) => {
        const info = JSON.parse(JSON.stringify(data));
        console.log(info);
        localStorage.setItem('token', info.token);
        localStorage.setItem('url', `/moderator/${info.data}/`);
        this._router.navigate(['/moderator/', info.data]);
      });
    } else if (x === 'adm') {
      this._auth.admincheck(this.User).subscribe((data) => {
        const info = JSON.parse(JSON.stringify(data));
        localStorage.setItem('token', info.token);
        localStorage.setItem('url', `/admin/${info.data}/`);
        this._router.navigate(['/admin/', info.data]);
      });
    } else {
      window.location.reload();
    }
  };
}
