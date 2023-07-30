import { Injectable } from '@angular/core';
import { Pedagogo } from '../models/IPedagogue.model';
import { HttpClient } from '@angular/common/http';
import { Estudante } from '../models/IEstudante.model';
import { Acompanhamentos } from '../models/IAcompanhamento.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'http://localhost:3000/'

  constructor(private httpClient: HttpClient) { }

  criarPedagogo(data: Pedagogo) {
    return this.httpClient.post(`${this.url}pedagogue`, data)
  }

  criarEstudante(data: Estudante) {
    return this.httpClient.post(`${this.url}estudantes`, data)
  }

  criarAcompanhamento(data: Acompanhamentos) {
    return this.httpClient.post(`${this.url}acompanhamentos`, data)
  }
}
