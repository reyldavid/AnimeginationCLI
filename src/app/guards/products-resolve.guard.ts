import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiProduct } from '../models/product';
import { ProductsService } from '../services/products.service';


@Injectable({
    providedIn: 'root'
})
export class ProductsResolve implements Resolve<ApiProduct> {

    constructor (private productsService: ProductsService) {
    }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ApiProduct {

        this.productsService.getAnimeProducts().subscribe(products => {
            this.productsService.setProductsCache(products);
        })

        let sProductID = route.paramMap.get('productID');
        let productID = parseInt(sProductID);

        this.productsService.getAnimeProduct(productID).subscribe(product => {
            this.productsService.setProductCache(product, productID);
        })
        return null;
    }
}
