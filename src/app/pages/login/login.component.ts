import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { Pedagogo } from 'src/app/shared/models/IPedagogue.model';
import { Router } from '@angular/router';

@Component({
  selector: 'lab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  erro = ''
  loginForm: FormGroup;
  usuarios: Pedagogo[] = []
  loginEstado = false

  constructor(private formBuilder: FormBuilder, private service: LoginService, private rota: Router) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    let verificaLogin = this.service.verificaLogin()
  }

  criarConta() {
    this.rota.navigate(['/registro'])
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.password;

    this.service.getLogin()
      .subscribe((usuarios) => {
        this.usuarios = usuarios

        for (let usuario of this.usuarios) {
          if (email === usuario.email && senha === usuario.senha) {
            this.loginEstado = true
            localStorage.setItem("logado", "true")
            this.rota.navigate(['home'])
            break
          }
        }
        if (this.loginEstado === false) {
          this.erro = 'Senha ou email inválido';
        }


      })
  }
}
