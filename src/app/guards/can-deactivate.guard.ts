import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductComponent } from '../product/product.component';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ProductComponent> {

  constructor(private messageService: MessageService) {
  }

  canDeactivate(
    component: ProductComponent, 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot 
  ): Observable<boolean> | boolean {

    console.log(state.url);
    this.messageService.selectFooter(true);

    return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
