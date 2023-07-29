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
export class RegisterUserComponent {

  cadastroForm: FormGroup

  constructor(private registerService: RegisterService, private datePipe: DatePipe, private router: Router) {
    this.cadastroForm = new FormGroup({
      "nome": new FormControl('', Validators.required),

      "cel": new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),

      "nasc": new FormControl('', [Validators.required, this.ValidaNasc()]),

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

  ValidaNasc(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.cadastroForm == null) {
        return null
      }
      const dataAtual = new Date()
      const anoAtual = dataAtual.getFullYear()
      const mesAtual = dataAtual.getMonth() + 1
      const diaAtual = dataAtual.getDate()

      const nasc = this.cadastroForm.get('nasc')?.value
      const anoNasc = parseInt(nasc.slice(0, 4))
      const mesNasc = parseInt(nasc.slice(5, 7))
      const diaNasc = parseInt(nasc.slice(8, 10))

      if (anoNasc > anoAtual) {
        return { 'ErroNasc': true }
      }
      else if (anoNasc === anoAtual) {
        if (mesNasc > mesAtual) {
          return { 'ErroNasc': true }
        }
        else if (mesNasc === mesAtual && diaNasc >= diaAtual) {
          return { 'ErroNasc': true }
        }
      }
    return null
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

  ErroNasc() {
    return this.cadastroForm.get('nasc')?.value.length > 0 && this.cadastroForm.get('nasc')?.errors && this.cadastroForm.get('nasc')?.hasError('ErroNasc')
  }

  cadastrar() {
    const nome = this.cadastroForm.get('nome')?.value 
    const cel = this.cadastroForm.get('cel')?.value 
    let nasc = this.cadastroForm.get('nasc')?.value 
    const cpf = this.cadastroForm.get('cpf')?.value 
    const email = this.cadastroForm.get('email')?.value 
    const senha = this.cadastroForm.get('pass')?.value 

    nasc = this.datePipe.transform(nasc, 'dd/MM/yyyy')
    
    const postData = {
      "name": nome,
      "phone": cel,
      "dateBirth": nasc,
      "cpf": cpf,
      "email": email,
      "senha": senha 
    }

    this.registerService.postTeacher(postData)
    .subscribe((result) => {
      console.log(result)
      alert("Cadastro bem sucedido.")
      this.router.navigate(['/login'])
    })
  }
}