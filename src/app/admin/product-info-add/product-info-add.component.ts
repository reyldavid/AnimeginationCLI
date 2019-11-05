import { Component, OnInit } from '@angular/core';
import { ApiProduct, Product } from '../../models/product';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { ProductsService } from '../../services/products.service';
import { MessageService } from '../../services/message.service';
import { PublishersService } from '../../services/publishers.service';
import { MediaService } from '../../services/media.service';
import { CategoryService } from '../../services/categories.service';
import { Publisher } from '../../models/publisher';
import { Category } from '../../models/category';
import { Medium } from '../../models/medium';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-info-add',
  templateUrl: './product-info-add.component.html',
  styleUrls: ['./product-info-add.component.css']
})
export class ProductInfoAddComponent implements OnInit {

  product: Product = {
    productid: 0,
    productcode: "",
    producttitle: "",
    productdescription: "",
    unitprice: 0,
    yourprice: 0,
    categoryid: 5,
    productagerating: "",
    productlength: 0,
    productyearcreated: 0,
    mediumid: 1,
    publisherid: 62,
    ratingid: 0
  }
  submitted: boolean = false;
  genres: Category[];
  media: Medium[];
  publishers: Publisher[];

  constructor(private productsService: ProductsService, 
            private sessionService: SessionService, 
            private messageService: MessageService, 
            private genreService: CategoryService,
            private mediaService: MediaService,
            private publisherService: PublishersService) { }
  
  ngOnInit() {
    this.genreService.getAnimeCategories().subscribe(genres => {
      this.genres = genres;
      this.genreService.setCategoriesCache(genres);
    })

    this.mediaService.getMediaTypes().subscribe(media => {
      this.media = media;
      this.mediaService.Media = media;
    })

    this.publisherService.getPublishers().subscribe(publishers => {
      this.publishers = publishers;
      this.publisherService.Publishers = publishers;
      this.messageService.setSpinner(false);
    })
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
      let token = this.sessionService.UserToken;

      this.productsService.addProduct(token, this.product)
        .subscribe(product => {
          console.log("aya new product ", product);
          this.messageService.setSpinner(false);
        }, 
        (error) => {
          this.messageService.setSpinner(false);
          console.log("Error creating product: ", error);
      })
    }
  }

}

