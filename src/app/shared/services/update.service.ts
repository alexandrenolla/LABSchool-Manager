import { Injectable } from '@angular/core';
import { Acompanhamentos } from '../models/IAcompanhamento.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private httpClient: HttpClient) { }

  updateAcompanhamento(id: number, data: Acompanhamentos) {
    return this.httpClient.put(`http://localhost:3000/acompanhamentos/${id}`, data)
  }
}

