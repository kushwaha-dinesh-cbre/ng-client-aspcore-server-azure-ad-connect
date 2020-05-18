import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TechTalkService } from './http-services/tech.talk.service';
import { TechTalkItem } from './models/tech-talk-item';
import { MsalUserService } from './http-services/msal.user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-azure-ad-connect';
  acquireToken: any;
  techTalkTitle: any;
  errorMessage: any;
  values: any;
  techTalks: any;
  currentUser: any;

  constructor(
    private router: Router,
    private techTalkService: TechTalkService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getTechTalks();
  }
  createTechTalk() {
    var item = new TechTalkItem();
    item.title = this.techTalkTitle;
    this.techTalkService.addTechTalks(item).subscribe(
      values => {
        this.values = values;
        console.log(values);
        this.getTechTalks();
      },
      error => this.errorMessage = <any>error
    );
  }

  private getTechTalks() {
    this.techTalkService.getTechTalks().subscribe(
      techtalks => {
        this.techTalks = techtalks;
        console.log(techtalks);
      },
      error => this.errorMessage = <any>error
    );
  }

  getUser() {
    this.currentUser = this.techTalkService.getCurrentUserInfo().name;
    console.log(this.currentUser);
  }

  logout() {
    this.techTalkService.logout();
  }

}
