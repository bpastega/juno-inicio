
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from './login';
import { Usuario } from './usuario';
import { environment } from '../../environments/environment';
import { KeycloakToken } from '../models/KeycloakToken';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  usuario!: Usuario;
 // API = environment.API + '/api';
API = environment.API+"/api";


  


  constructor() {}

  

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API + '/login', login, {
      responseType: 'text' as 'json',
    });
  }
  

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<KeycloakToken>(token);
    }
    return null;
  }



  hasPermission(role: string): boolean {
  const user = this.jwtDecode();
  if (user && user.realm_access?.roles) {
    return user.realm_access.roles.includes(role);
  }
  return false;
}


getUsuarioLogado(): Usuario {
  const tokenData = this.jwtDecode();
  if (!tokenData) throw new Error('Token inválido ou ausente');

  const token = new KeycloakToken(tokenData);
  if (!token.email) throw new Error('Email não encontrado no token');

  const user = new Usuario();
  user.email = token.email;
  user.role = token.getRole();
  return user;
}

  
  
}

