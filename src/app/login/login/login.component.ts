import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../shared/model/login.model';
import { LoginService } from '../shared/shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public efetuandoLogin: boolean;
  public login: Login = new Login();

  constructor(
    private loginService: LoginService,
    private toastyService: ToastrService
  ) { }

  ngOnInit() {
  }

  public efetuarLogin() {
    this.efetuandoLogin = true;
    this.loginService.efetuarLogin(this.login).subscribe(
      (response) => {
        localStorage.removeItem('token');
        var token = response.headers.get('Authorization').split(" ")[1];
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
        this.efetuandoLogin = false;
        window.location.href = 'http://127.0.0.1/gerenciador-atirador/software';
      },
      (error) => {
        if(error.status === 401) {
          this.toastyService.error('Usuario ou senha incorretos');
          this.efetuandoLogin = false;
        } else {
          this.efetuandoLogin = false;
          this.toastyService.error('Falha ao efetuar login');
        }
      }
    );
  }

}
