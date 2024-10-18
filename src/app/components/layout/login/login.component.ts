import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'; //Importado manualmente:: https://mdbootstrap.com/docs/angular/getting-started/modules-and-imports/

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email!: string;
  senha!: string;

  router = inject(Router); //semelhante ao Autowired no backend

  logar(){
    if(this.email == 'admin' && this.senha == 'admin'){
      //redirecionar para a pacientesList
      this.router.navigate(['admin/pacientes']);
    }

    else{
      alert('Usuário ou senha incorretos!!!')
    }
  }
}
