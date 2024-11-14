import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'; //Importado manualmente:: https://mdbootstrap.com/docs/angular/getting-started/modules-and-imports/
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router); //semelhante ao Autowired no backend
  loginService = inject(LoginService);

  constructor(){
    this.loginService.removerToken();
  }

  logar(){
    this.loginService.logar(this.login).subscribe({
      next: token =>{
        if(token){ //usuário e senha corretos
          this.loginService.addToken(token);
          this.router.navigate(['admin/dashboard'])
        }
        else{ //usuário ou senha incorretos
          alert("Usuário ou senha incorretos");
        }
      },
      error: erro =>{
        alert("erro");
      }
    })
  }
}
