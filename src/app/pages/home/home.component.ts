import { Component } from '@angular/core';
import { Acompanhamentos } from 'src/app/shared/models/IAcompanhamento.model';
import { dicionarioDatas } from 'src/app/shared/models/IDicionarioDatas.model';
import { Estudante } from 'src/app/shared/models/IEstudante.model';
import { Pedagogo } from 'src/app/shared/models/IPedagogue.model';
import { GetService } from 'src/app/shared/services/get.service';


@Component({
  selector: 'lab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  listaEstudantes: Estudante[] = []
  listaPedagogos: Pedagogo[] = []
  listaAcompanhamentos: Acompanhamentos[] = []
  listaAcompanhadosFinalizados: Acompanhamentos[] = []
  porcentagemFinalizados: number | string | undefined
  mapeamentoDatas: Map<string, Acompanhamentos[]> | undefined
  dicionarioDatas: dicionarioDatas = {}


  constructor(private getService: GetService) { }


  ngOnInit(): void {
    this.getService.getEstudantes().subscribe((response) => {
      this.listaEstudantes = response
    })

    this.getService.getPedagogos().subscribe((response) => {
      this.listaPedagogos = response
    })

    this.getService.getAcompanhamentos().subscribe((response) => {
      this.listaAcompanhamentos = response


      this.mapeamentoDatas = this.AcompanhamentosPorData(this.listaAcompanhamentos)
      this.mapeamentoDatas.forEach((acompanhamentos: Acompanhamentos[], data: string) => {
        this.dicionarioDatas[data] = acompanhamentos.length
      })

 
      this.listaAcompanhadosFinalizados = this.listaAcompanhamentos.filter(acompanhamentos => acompanhamentos.finalizado === true)
      this.porcentagemFinalizados = this.listaAcompanhadosFinalizados.length / this.listaAcompanhamentos.length * 100
      this.porcentagemFinalizados = this.porcentagemFinalizados.toFixed(2)
    })
  }

  AcompanhamentosPorData(acompanhamentos: Acompanhamentos[]): Map<string, Acompanhamentos[]> {
    return acompanhamentos.reduce((map, acompanhamento) => {
      const { data } = acompanhamento;
      if (map.has(data)) {
        map.get(data)?.push(acompanhamento);
      } else {
        map.set(data, [acompanhamento]);
      }
      return map;
    }, new Map<string, Acompanhamentos[]>());
  }
}