import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TesteRapido } from '../models/teste-rapido';

@Injectable({
  providedIn: 'root'
})
export class TesteRapidoService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/testeRapido";

  constructor() { }

  findAll(): Observable<TesteRapido[]>{
    return this.http.get<TesteRapido[]>(this.API+"/findAll");
  }

  save(teste: TesteRapido): Observable<string> {
    return this.http.post<string>(this.API+'/save', teste, { responseType: 'text' as 'json' });
  }

  update(teste: TesteRapido): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+teste.id, teste, { responseType: 'text' as 'json' });
  }

  encerrar(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<TesteRapido> {
    return this.http.get<TesteRapido>(this.API+"/findById/"+id);
  }

  findAllByPacienteId(id: number): Observable<TesteRapido[]>{
    return this.http.get<TesteRapido[]>(this.API+"/findAllByPacienteId/"+id);
  }

  /*Dashboard*/
  countAllByExameSangue(): Observable<number>{
    return this.http.get<number>(this.API+'/countAllByExameSangue');
  }

  countAllByExameUrina(): Observable<number>{
    return this.http.get<number>(this.API+'/countAllByExameUrina');
  }

  countAllByExameCompleto(): Observable<number>{
    return this.http.get<number>(this.API+'/countAllByExameCompleto');
  }

  countAllByExameGenerico(): Observable<number>{
    return this.http.get<number>(this.API+'/countAllByExameGenerico');
  }
}
