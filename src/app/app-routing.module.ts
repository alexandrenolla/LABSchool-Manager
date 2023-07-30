import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PublicoComponent } from './shared/layouts/publico/publico.component';
import { PrivadoComponent } from './shared/layouts/privado/privado.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterEstudanteComponent } from './pages/register-estudante/register-estudante.component';
import { GetEstudantesComponent } from './pages/get-estudantes/get-estudantes.component';
import { GetAcompanhamentosComponent } from './pages/get-acompanhamentos/get-acompanhamentos.component';
import { RegisterAcompanhamentoComponent } from './pages/register-acompanhamento/register-acompanhamento.component';
import { UpdateAcompanhamentoComponent } from './pages/update-acompanhamento/update-acompanhamento.component';
import { RotaErradaComponent } from './pages/rota-errada/rota-errada.component';
import { ErroComponent } from './pages/erro/erro.component';
import { acessoPrivado, acessoPublico } from './guards/guards.guard';

const routes: Routes = [
  {
    path: '', component: PublicoComponent,
    canActivate: [acessoPublico],
    children: [
      { path: '', redirectTo: 'login', pathMatch: "full" },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegisterComponent }]
  },
  {
    path: '', component: PrivadoComponent,
    canActivate: [acessoPrivado],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'registro-estudante', component: RegisterEstudanteComponent },
      { path: 'estudantes', component: GetEstudantesComponent },
      { path: 'acompanhamentos', component: GetAcompanhamentosComponent },
      { path: 'registro-acompanhamento', component: RegisterAcompanhamentoComponent },
      { path: 'atualizar-acompanhamento/:id', component: UpdateAcompanhamentoComponent }]
  },
  { path: 'erro', component: ErroComponent},
  { path: '**', component: RotaErradaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
