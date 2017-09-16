import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SavedPage } from '../saved/saved';
import { AboutUsPage } from '../about-us/about-us';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SavedPage;
  tab3Root = AboutUsPage;


  constructor() {

  }
}
