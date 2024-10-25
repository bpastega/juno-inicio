import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  http = inject(HttpClient);

  API = "http://localhost:8080/api/consulta";

  constructor() { }

  findAll(): Observable<Consulta[]>{
    return this.http.get<Consulta[]>(this.API+"/findAll");
  }

  save(consulta: Consulta):Observable<string>{
    return this.http.post<string>(this.API+'/save', consulta, {responseType: 'text' as 'json'})
  }
  update(consulta: Consulta):Observable<string>{
    return this.http.put<string>(this.API+'/update',consulta.id,  {responseType: 'text' as 'json'})
  }

  encerrar(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Consulta>{
    return this.http.get<Consulta>(this.API+"/findById/"+id);
  }

}
