import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Acompanhamentos } from 'src/app/shared/models/IAcompanhamento.model';
import { GetService } from 'src/app/shared/services/get.service';

@Component({
  selector: 'lab-get-acompanhamentos',
  templateUrl: './get-acompanhamentos.component.html',
  styleUrls: ['./get-acompanhamentos.component.scss']
})
export class GetAcompanhamentosComponent {

  listaAcompanhamentos2: Acompanhamentos[] = []
  listaAcompanhamentos: Acompanhamentos[] = []
  pesquisa: string = ''

  constructor(private getService: GetService, private route: Router) { }

  ngOnInit(): void {
    this.getService.getAcompanhamentos().subscribe((response) => {
      this.listaAcompanhamentos2 = response;
      this.listaAcompanhamentos = [...response]
    })
  }

  procurar() {
    if (this.pesquisa) {
      this.listaAcompanhamentos2 = this.listaAcompanhamentos.filter(monitoring => monitoring.titulo.toLowerCase().includes(this.pesquisa.toLowerCase()))
      if (this.listaAcompanhamentos2.length === 0) {
        this.listaAcompanhamentos2 = this.listaAcompanhamentos
        alert("Não há registros.")
      }
    }
    else if (this.pesquisa === '') {
      this.listaAcompanhamentos2 = this.listaAcompanhamentos
    }
  }

  IrCadastrar() {
    this.route.navigate(['/register-acompanhamento'])
  }

  IrEditar(id: number | undefined) {
    this.route.navigate([`edit-monitoring/${id}`])
  }
}
