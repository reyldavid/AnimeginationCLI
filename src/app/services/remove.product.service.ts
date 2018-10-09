// import {Injectable} from '@angular/core';
// import {PRODUCTS} from '../data/products.offline';
// import {ApiProduct} from '../models/product';
// import {ListType} from '../models/listtype';
// import { LisTypeService } from './listtypes.service';

// @Injectable()
// export class ProductService {

//     constructor(private _apiService: ListType) {
//     }

//     getProducts() {
//         return Promise.resolve(PRODUCTS);
//     }

//     // getApiProduct(productId: string) {
//     //     //let apiProduct: ApiProduct;
//     //     //this._apiService.getAnimeProduct(productId)
//     //     //    .subscribe(
//     //     //    (data: any) => apiProduct = data,
//     //     //    error => alert(error),
//     //     //    () => console.log("Api Product seikoo")
//     //     //    );
//     //     //return Promise.resolve(apiProduct);

//     //     return new Promise(resolve => {
//     //         this._apiService.getAnimeProduct(productId)
//     //             .subscribe(
//     //             (data: ApiProduct) => resolve(data),
//     //             error => alert(error),
//     //             () => console.log("Api Product seikoo")
//     //             );
//     //     });
//     // }

//     // getApiProducts() {
//     //     //let apiProducts: ApiProduct[];
//     //     //this._apiService.getAnimeProducts()
//     //     //    .subscribe(
//     //     //    (data: ApiProduct[]) => apiProducts = data,
//     //     //    error => alert(error),
//     //     //    () => console.log("Yoku itadakimashishita ")
//     //     //);
//     //     //return Promise.resolve(apiProducts);

//     //     return new Promise(resolve => {
//     //         this._apiService.getAnimeProducts()
//     //             .subscribe(
//     //             (data: ApiProduct[]) => resolve(data),
//     //             error => alert(error),
//     //             () => console.log("Api Products seikoo")
//     //         );
//     //     });
//     // }

//     // getApiListing(listTypeID: number) {
//     //     return new Promise(resolve => {
//     //         this._apiService.getAnimeListing(listTypeID)
//     //             .subscribe(
//     //             (data: ApiProduct[]) => resolve(data),
//     //             error => alert(error),
//     //             () => console.log("Api Listing seikoo")
//     //             );
//     //     });
//     // }

//     // getApiListType(listTypeID: number) {
//     //     return new Promise(resolve => {
//     //         this._apiService.getAnimeListType(listTypeID)
//     //             .subscribe(
//     //             (data: ListType) => resolve(data),
//     //                 error => alert(error),
//     //                 () => console.log("Api List Type seikoo")
//     //             );
//     //     });
//     // }
// }