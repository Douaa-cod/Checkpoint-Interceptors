import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  login(loginForm : NgForm){
    this.authenticationService.login(loginForm.value).subscribe(
      (data) => {
        localStorage.setItem('token', data.id),
        this.router.navigate(['CVs'])
      },
      (erreur) => console.log(erreur),
    )
  }

}
