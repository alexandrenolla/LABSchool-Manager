import { Injectable } from '@angular/core';
import { Pedagogo } from '../models/IPedagogue';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'http://localhost:3000/pedagogue'

  constructor(private httpClient: HttpClient) { }

  criarPedagogo(data: Pedagogo) {
    return this.httpClient.post(this.url, data)
  }
}
