import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiProduct, Product } from '../../models/product';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { ProductsService } from '../../services/products.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PublishersService } from '../../services/publishers.service';
import { MediaService } from '../../services/media.service';
import { CategoryService } from '../../services/categories.service';
import { Publisher } from '../../models/publisher';
import { Category } from '../../models/category';
import { Medium } from '../../models/medium';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-info-edit',
  templateUrl: './product-info-edit.component.html',
  styleUrls: ['./product-info-edit.component.css']
})
export class ProductInfoEditComponent implements OnInit {

  // product: ApiProduct = {
  //   ProductID: 0,
  //   ProductCode: "",
  //   ProductTitle: "",
  //   ProductDescription: "",
  //   UnitPrice: 0,
  //   YourPrice: 0,
  //   CategoryName: "",
  //   ProductAgeRating: "",
  //   ProductLength: 0,
  //   ProductYearCreated: 0,
  //   MediumName: "",
  //   PublisherName: "",
  //   OnSale: false,
  //   RatingID: 0
  // }
  product: Product = {
    productid: 0,
    productcode: "",
    producttitle: "",
    productdescription: "",
    unitprice: 0,
    yourprice: 0,
    categoryid: 0,
    productagerating: "",
    productlength: 0,
    productyearcreated: 0,
    mediumid: 0,
    publisherid: 0,
    ratingid: 0
  }

  submitted: boolean = false;
  productID: number;
  productsSubscription: Subscription;
  genres: Category[];
  media: Medium[];
  publishers: Publisher[];

  constructor(private productsService: ProductsService, 
              private sessionService: SessionService, 
              private messageService: MessageService, 
              private genreService: CategoryService,
              private mediaService: MediaService,
              private publisherService: PublishersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('product edit init');
    this.route.paramMap.subscribe(params => {
      let productIDparam = params.get('productID');

      if (productIDparam) {
        this.productID = parseInt(productIDparam);
        // this.getProduct();
      }
    })

    this.route.queryParams.subscribe(params => {
        this.productID = parseInt(params.productID);
        if (this.productID) {
        // this.getProduct();
      }
    })

    this.genreService.getAnimeCategories().subscribe(genres => {
      this.genres = genres;
      this.genreService.setCategoriesCache(genres);

      this.mediaService.getMediaTypes().subscribe(media => {
        this.media = media;
        this.mediaService.Media = media;

        this.publisherService.getPublishers().subscribe(publishers => {
          this.publishers = publishers;
          this.publisherService.Publishers = publishers;

          this.productsSubscription = this.productsService
              .getAnimeProduct(this.productID).subscribe(product => {

                // let product = _.find(products, function(item) {
                //   return item.productId == __this.productID;
                // } ) 
                this.product = this.productsService.convertProduct(product);
                this.messageService.setSpinner(false);
          })
          this.productsSubscription.unsubscribe();
        })
      })
    })
  }

  ngOnDestroy() {
    // this.productsSubscription.unsubscribe();
  }

  selectGenre(genreId: number) {
    this.product.categoryid = genreId;
  }
  selectMedium(mediumId: number) {
    this.product.mediumid = mediumId;
  }
  selectPublisher(publisherId: number) {
    this.product.publisherid = publisherId;
  }

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.productsService.updateProduct(token, this.product)
        .subscribe(product => {
          console.log("aya product ", product);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error updating product: ", error);
        })
    }
  }

}
