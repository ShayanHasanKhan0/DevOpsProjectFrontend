import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit,AfterViewInit {

  toggle:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  loading:boolean=true;

  ngAfterViewInit():void {
    setTimeout(() => {
      this.loading=false;
    }, 0);
  }

  toggleEditable(event) {
    if ( event.target.checked ) {
      this.toggle = true;
      return;
    }
    this.toggle = false;
  }
}
