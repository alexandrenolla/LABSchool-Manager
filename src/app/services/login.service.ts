import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedagogue } from '../shared/models/IPedagogue';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000/pedagogue'
  constructor(private HttpClient: HttpClient) {}

  getLogin() {
    return this.HttpClient.get<Pedagogue[]>(this.url)
  }
}
