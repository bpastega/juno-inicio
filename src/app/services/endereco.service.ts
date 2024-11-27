import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  
  http = inject(HttpClient);

  // API = "http://localhost:8080/api/endereco";
  API = environment.API="/api/endereco";


  constructor() { }


  
  findAll(): Observable<Endereco[]>{
    return this.http.get<Endereco[]>(this.API+"/findAll");
  }

  save(endereco: Endereco):Observable<string>{
    return this.http.post<string>(this.API+'/save', endereco, {responseType: 'text' as 'json'})
  }
  update(endereco: Endereco):Observable<string>{
    return this.http.put<string>(this.API+'/update',endereco.id,  {responseType: 'text' as 'json'})
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Endereco>{
    return this.http.get<Endereco>(this.API+"/findById/"+id);
  }

}
