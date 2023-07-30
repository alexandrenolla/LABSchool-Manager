import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedagogo } from '../models/IPedagogue.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000/pedagogue'
  constructor(private HttpClient: HttpClient) {}

  getLogin() {
    return this.HttpClient.get<Pedagogo[]>(this.url)
  }

  verificaLogin(){
    let logado = localStorage.getItem("logado")
    if (logado === null){
      logado = "false"
      return false
    }
    else{
      return true
    }


  }
}
