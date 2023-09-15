import { KeycloakService } from 'keycloak-angular';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  mobileQuery: MediaQueryList;
  private KeycloakService = inject(KeycloakService);
  username: any;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Categorías", route: "category", icon: "category"},
    {name: "Productos", route: "product", icon: "production_quantity_limits"}
  ]

  constructor(media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.username = this.KeycloakService.getUsername();
  }

  logout(){
    this.KeycloakService.logout();//Cierra sesion
  }

}
