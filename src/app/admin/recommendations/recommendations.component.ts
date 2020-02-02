import { Component, OnInit } from '@angular/core';
import { RecommendsService } from '../../services/recommend.service';
import { Recommendation } from '../../models/recommendation';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { TokenModel } from '../../models/tokenmodel';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  recommends: Recommendation[] = [];

  constructor( private router: Router,
               private recommendsService: RecommendsService, 
               private sessionService: SessionService, 
               private messageService: MessageService ) { }

  ngOnInit() {
    this.recommendsService.getRecommends().subscribe(recommends => {
      this.recommends = recommends;
      this.recommendsService.setRecommendsCache(recommends);
    })
  }

  OnEditRecommend(recommend: Recommendation) {
    this.router.navigate(['/recommend-edit'], { queryParams: { recommendID: recommend.recommendId } });
  }

  OnDeleteRecommend(recommend: Recommendation) {
    if (this.sessionService.isAuthenticated()) {
      let token: TokenModel = this.sessionService.UserToken;

      this.recommendsService.deleteRecommend(token, recommend).subscribe(item => {
        this.messageService.setSpinner(false);
      })
    }
  }

}

