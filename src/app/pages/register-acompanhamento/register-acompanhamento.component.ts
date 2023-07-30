import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estudante } from '../../shared/models/IEstudante.model';
import { Pedagogo } from '../../shared/models/IPedagogue.model';
import { GetService } from '../../shared/services/get.service';
import { RegisterService } from '../../shared/services/register.service';
import { Acompanhamentos } from '../../shared/models/IAcompanhamento.model';


@Component({
  selector: 'lab-register-acompanhamento',
  templateUrl: './register-acompanhamento.component.html',
  styleUrls: ['./register-acompanhamento.component.scss']
})
export class RegisterAcompanhamentoComponent {

  cadastrarForm: FormGroup
  listaEstudantes: Estudante[] = []
  listaPedagogos: Pedagogo[] = []
  dados: Acompanhamentos = {
    estudante: '',
    pedagogo: '',
    titulo: '',
    data: '',
    descricao: '',
    finalizado: false
  }
  
  constructor(private getService: GetService, private registerService: RegisterService, private datePipe: DatePipe, private route: Router) {

    this.cadastrarForm = new FormGroup({

      'nomeEstudante': new FormControl('', Validators.required),

      'nomePedagogo': new FormControl('', Validators.required),

      'titulo': new FormControl('', Validators.required),

      'data': new FormControl(this.FormatarDataAtual(), Validators.required),

      'descricao': new FormControl('', Validators.required),

      'finalizado': new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getService.getEstudantes().subscribe((response) => {
      this.listaEstudantes = response;
    })

    this.getService.getPedagogos().subscribe((response) => {
      this.listaPedagogos = response;
    })
  }

  MsgErro(campo: string) {
    return (this.cadastrarForm.get(campo)?.value === null || this.cadastrarForm.get(campo)?.value.length === 0) && this.cadastrarForm.get(campo)?.touched
  }

  MsgErroSelect(campo: string) {
    return (this.cadastrarForm.get(campo)?.value === '' || this.cadastrarForm.get(campo)?.value === 'Select') && this.cadastrarForm.get(campo)?.touched
  }

  FormatarData(data: string): string {
    const parts = data.split('/')
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    } 
    else {
      return data;
    }
  }

  FormatarDataAtual() {
    const dataAtual = new Date()
    const diaAtual = dataAtual.getDate()
    const anoAtual = dataAtual.getFullYear()
    let mesAtual: string | number = dataAtual.getMonth() + 1
    if (mesAtual < 10) {
      mesAtual = `0${mesAtual}`
    }
    return `${anoAtual}-${mesAtual}-${diaAtual}`
  }

  enviarDados() {

    const estudante = this.cadastrarForm.get('nomeEstudante')?.value
    const pedagogo = this.cadastrarForm.get('nomePedagogo')?.value
    const titulo = this.cadastrarForm.get('titulo')?.value
    let data = this.cadastrarForm.get('data')?.value
    const descricao = this.cadastrarForm.get('descricao')?.value
    const finalizado = this.cadastrarForm.get('finalizado')?.value

    data = this.datePipe.transform(data, 'dd/MM/yyyy')

    this.dados = {
      "estudante": estudante,
      "pedagogo": pedagogo,
      "titulo": titulo,
      "data": data,
      "descricao": descricao,
      "finalizado": finalizado
    }

    this.registerService.criarAcompanhamento(this.dados).subscribe((response) => {
      alert("Acompanhamento pedagógico criado com sucesso!")
      this.route.navigate(['acompanhamentos'])
    })
  }
}