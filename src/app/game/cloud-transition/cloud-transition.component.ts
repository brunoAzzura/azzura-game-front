import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cloud-transition',
  templateUrl: './cloud-transition.component.html',
  styleUrls: ['./cloud-transition.component.sass']
})
export class CloudTransitionComponent implements OnInit {

  @Input() transition: boolean;
  public transitionPath: string;

  constructor() { }

  ngOnInit() {
  }
}
