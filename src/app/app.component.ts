import { Component, OnInit } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';
import { User } from 'oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  identity: Observable<User>;

  constructor(
    private oidcFacade: OidcFacade
  ) {
    this.identity = this.oidcFacade.identity$;
  }

  ngOnInit(): void {
    this.oidcFacade.getOidcUser();
  }

  signoutRedirect() {
    this.oidcFacade.signoutRedirect();
  }
}
