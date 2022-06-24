import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page-component.html',
  styleUrls: ['./home.page-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent  {

  constructor() { }

}
