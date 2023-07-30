import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/shared/services/register.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lab-register-estudante',
  templateUrl: './register-estudante.component.html',
  styleUrls: ['./register-estudante.component.scss']
})
export class RegisterEstudanteComponent {

  cadastrarForm: FormGroup

  constructor(private registerService: RegisterService, private router: Router, private datePipe: DatePipe) {
    this.cadastrarForm = new FormGroup({
      "nome": new FormControl('', Validators.required),

      "cel": new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),

      "nasc": new FormControl('', [Validators.required, this.nascValida()]),

      "cpf": new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),

      "nota": new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)])
    })
  }

  nascValida(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.cadastrarForm == null) {
        return null
      }
      const dataAtual = new Date()
      const anoAtual = dataAtual.getFullYear()
      const mesAtual = dataAtual.getMonth() + 1
      const diaAtual = dataAtual.getDate()

      const nasc = this.cadastrarForm.get('nasc')?.value
      const ano = parseInt(nasc.slice(0, 4))
      const mes = parseInt(nasc.slice(5, 7))
      const dia = parseInt(nasc.slice(8, 10))

      if (ano > anoAtual) {
        return { 'nascInvalido': true }
      }
      else if (ano === anoAtual) {
        if (mes > mesAtual) {
          return { 'nascInvalido': true }
        }
        else if (mes === mesAtual && dia >= diaAtual) {
          return { 'nascInvalido': true }
        }
      }
      return null
    }
  }

  MsgErro(field: string) {
    return (this.cadastrarForm.get(field)?.value === null || this.cadastrarForm.get(field)?.value.length === 0) && this.cadastrarForm.get(field)?.touched
  }

  MsgErroNasc() {
    return this.cadastrarForm.get('nasc')?.value.length > 0 && this.cadastrarForm.get('nasc')?.errors && this.cadastrarForm.get('nasc')?.hasError('nascInvalid')
  }

  cadastrar() {
    const name = this.cadastrarForm.get('nome')?.value
    const phone = this.cadastrarForm.get('cel')?.value
    let nasc = this.cadastrarForm.get('nasc')?.value
    const cpf = this.cadastrarForm.get('cpf')?.value
    const grade = this.cadastrarForm.get('nota')?.value

    nasc = this.datePipe.transform(nasc, 'dd/MM/yyyy')

    const dados = {
      "nome": name,
      "cel": phone,
      "nasc": nasc,
      "cpf": cpf,
      "nota": grade
    }

    this.registerService.criarEstudante(dados)
      .subscribe((response) => {
        console.log(response)
        alert("Cadastrado.")
        this.router.navigate(["estudantes"])
      })
  }
}