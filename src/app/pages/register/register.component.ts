import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/shared/services/register.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lab-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  cadastroForm: FormGroup

  constructor(private registerService: RegisterService, private datePipe: DatePipe, private router: Router) {
    this.cadastroForm = new FormGroup({
      "nome": new FormControl('', Validators.required),

      "cel": new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),

      "nasc": new FormControl('', Validators.required),

      "cpf": new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),

      "email": new FormControl('', [Validators.required, Validators.email]),

      "pass": new FormControl('', [Validators.required, Validators.min(8)]),

      "confirmaPass": new FormControl('', [Validators.required, Validators.min(8), this.ValidaPassConf()]),
    })
  }

  ValidaPassConf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.cadastroForm == null) {
        return null
      }
      const senha = this.cadastroForm.get('pass')?.value
      const confirmaPass = this.cadastroForm.get('confirmaPass')?.value
      if (senha != confirmaPass) {
        return { 'ErroConfirmaPass': true }
      }
      else {
        return null
      }
    }
  }


  ErroMsg(campo: string) {
    return this.cadastroForm.get(campo)?.value.length === 0 && this.cadastroForm.get(campo)?.touched
  }

  ErroPass(campo: string) {
    return this.cadastroForm.get(campo)?.value.length > 0 && this.cadastroForm.get(campo)?.value.length < 8 && this.cadastroForm.get(campo)?.touched
  }

  ErroConfirmaPass() {
    return this.cadastroForm.get('confirmaPass')?.value.length > 0 && this.cadastroForm.get('confirmaPass')?.errors && this.cadastroForm.get('confirmaPass')?.hasError('ErroConfirmaPass')
  }

  cadastrar() {
    if (this.cadastroForm.invalid){
      console.log(this.cadastroForm.errors)
    }
    const nome = this.cadastroForm.get('nome')?.value 
    const cel = this.cadastroForm.get('cel')?.value 
    let nasc = this.cadastroForm.get('nasc')?.value 
    const cpf = this.cadastroForm.get('cpf')?.value 
    const email = this.cadastroForm.get('email')?.value 
    const senha = this.cadastroForm.get('pass')?.value 

    nasc = this.datePipe.transform(nasc, 'dd/MM/yyyy')
    
    const data = {
      "nome": nome,
      "email": email,
      "senha": senha 
    }

    this.registerService.criarPedagogo(data)
    .subscribe((result) => {
      console.log(result)
      alert("Cadastro bem sucedido.")
      this.router.navigate(['/login'])
    })
  }
}