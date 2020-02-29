import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CartsService } from 'src/app/components/cart/carts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public user;

  constructor(
    private authService: AuthService,
    public cartsService: CartsService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.cartsService.getUser().subscribe(
      (res: any) => {
        this.user = res.result[0].name;
        console.log(this.user);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
