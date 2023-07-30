import { Injectable } from '@angular/core';
import { Pedagogo } from '../models/IPedagogue.model';
import { HttpClient } from '@angular/common/http';
import { Estudante } from '../models/IEstudante.model';
import { Acompanhamentos } from '../models/IAcompanhamento.model';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  url = 'http://localhost:3000/'

  constructor(private HttpClient: HttpClient) {}

  getPedagogos() {
    return this.HttpClient.get<Pedagogo[]>(`${this.url}pedagogue`)
  }

  getEstudantes(){
    return this.HttpClient.get<Estudante[]>(`${this.url}estudantes`)
  }

  getAcompanhamentos(){
    return this.HttpClient.get<Acompanhamentos[]>(`${this.url}acompanhamentos`)
  }



}


