import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { UserFeedbackService } from '../../services/userFeedback.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ApiProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { UserFeedbackModel } from '../../models/userFeedbackModel';
import { FeedbackType } from '../../models/feedbackType';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  productID: number;
  product: ApiProduct;
  ratingModel: UserFeedbackModel = { 
    feedbackType: FeedbackType.ProductReview, 
    productId: 0, 
    ratingId: 1, 
    title: "", 
    feedback: "" 
  };

  submitted: boolean = false;
  isSuccess: boolean = false;
  isFailure: boolean = false;
  errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute,  
              private productService: ProductsService, 
              private feedbackService: UserFeedbackService, 
              private sessionService: SessionService, 
              private cartService: CartService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let productIDparam = Number(params.get('productID'));

      if (productIDparam) {
        this.GetProduct(productIDparam);
      }
    })

    this.route.queryParams.subscribe(params => {
        this.productID = params.productID;

        if (this.productID) {
            this.GetProduct(this.productID);
        }
    })
}

  onSubmit() {
    this.submitted = true;

    if (this.sessionService.isAuthenticated()) {
      let token = this.sessionService.UserToken;
    
      this.feedbackService.addUserFeedback(token, this.ratingModel).subscribe(feedback => {
        this.messageService.setSpinner(false);
      },
      (error) => {
        this.messageService.setSpinner(false);
        console.log("Error creating feedback: ", error);
      });
      
    }
  }

  GetProduct(productId: number) {
    this.ratingModel.productId = productId;

    this.productService.getAnimeProduct(productId)
      .subscribe(((product: ApiProduct) => 
        {
          this.product = product;
          this.messageService.setSpinner(false);
        }
    ));
  }

  OnSelectProduct() {
    // this.router.navigate(['/detail'], { queryParams: {  productID: this.product.ProductID } });
    this.cartService.addVisitHistory(this.product.ProductID).subscribe(item => {
    })
  }

  getRating(rating: number) {
    this.ratingModel.ratingId = rating;
  }

}
