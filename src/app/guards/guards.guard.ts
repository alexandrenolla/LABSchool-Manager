import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { inject } from '@angular/core';

export const acessoPrivado: CanActivateFn = (route, state) => {
  if(inject(LoginService).verificaLogin() === true) {
    return true
  }
  else {
    return inject(Router).createUrlTree(['erro'])
  }
}


export const acessoPublico: CanActivateFn = (route, state) => {
  if(inject(LoginService).verificaLogin() === false) {
    return true
  }
  else {
    return inject(Router).createUrlTree(['erro'])
  }
}
