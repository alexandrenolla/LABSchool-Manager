import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudante } from '../../shared/models/IEstudante.model';
import { Pedagogo } from '../../shared/models/IPedagogue.model';
import { GetService } from '../../shared/services/get.service';
import { RegisterService } from '../../shared/services/register.service';
import { Acompanhamentos } from '../../shared/models/IAcompanhamento.model';
import { UpdateService } from 'src/app/shared/services/update.service';

@Component({
  selector: 'lab-update-acompanhamento',
  templateUrl: './update-acompanhamento.component.html',
  styleUrls: ['./update-acompanhamento.component.scss']
})
export class UpdateAcompanhamentoComponent {
  
  cadastrarForm: FormGroup
  listaEstudantes: Estudante[] = []
  listaPedagogos: Pedagogo[] = []
  acompanhamento_id: string | null  = ''
  acompanhamnto_id_number: number = 0
  dados: Acompanhamentos = {
    estudante: '',
    pedagogo: '',
    titulo: '',
    data: '',
    descricao: '',
    finalizado: false
  }
  
  constructor(private getService: GetService, private updateService: UpdateService, private datePipe: DatePipe, private route: Router, private activateRoute: ActivatedRoute) {

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
    this.acompanhamento_id = this.activateRoute.snapshot.paramMap.get('id')

    if (this.acompanhamento_id !== null) {
      this.acompanhamnto_id_number = parseInt(this.acompanhamento_id)
    }
    this.getService.getEstudantes().subscribe((response) => {
      this.listaEstudantes = response;
    })

    this.getService.getPedagogos().subscribe((response) => {
      this.listaPedagogos = response;
    })
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

    this.updateService.updateAcompanhamento(this.acompanhamnto_id_number, this.dados).subscribe((response) => {
      alert("Acompanhamento pedagógico alterado com sucesso!")
      this.route.navigate(['acompanhamentos'])
    })
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

  MsgErro(campo: string) {
    return (this.cadastrarForm.get(campo)?.value === null || this.cadastrarForm.get(campo)?.value.length === 0) && this.cadastrarForm.get(campo)?.touched
  }

  MsgErroSelect(campo: string) {
    return (this.cadastrarForm.get(campo)?.value === '' || this.cadastrarForm.get(campo)?.value === 'Select') && this.cadastrarForm.get(campo)?.touched
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
}