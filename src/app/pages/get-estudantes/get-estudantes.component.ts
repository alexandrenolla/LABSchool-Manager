import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudante } from 'src/app/shared/models/IEstudante.model';
import { GetService } from 'src/app/shared/services/get.service';


@Component({
  selector: 'lab-get-estudantes',
  templateUrl: './get-estudantes.component.html',
  styleUrls: ['./get-estudantes.component.scss']
})
export class GetEstudantesComponent implements OnInit {

  ListaEstudantes2: Estudante[] = []
  ListaEstudantes: Estudante[] = []
  pesquisa: string = ''

  constructor(private listService: GetService, private router: Router) { }

  ngOnInit(): void {
    this.listService.getEstudantes().subscribe((result) => {
      this.ListaEstudantes2 = result;
      this.ListaEstudantes = [...result]
    })
  }

  procurar(){
    if(this.pesquisa){
      this.ListaEstudantes2 = this.ListaEstudantes.filter(student => student.nome.toLowerCase().includes(this.pesquisa.toLowerCase()))
      if (this.ListaEstudantes2.length === 0){
        this.ListaEstudantes2 = this.ListaEstudantes
        alert("Nenhum Registro.")
      }
    }
    else if (this.pesquisa === ''){
      this.ListaEstudantes2 = [...this.ListaEstudantes];
    }
  }
  
  IrCadastro(){
    this.router.navigate(['/register-estudante'])
  }
}