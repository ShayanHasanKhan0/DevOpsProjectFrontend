import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  toggle;//remove
  loaded=true;

  p: number = 1;

  responses =[{"s":"10000000"},{"s":"200000"},{"s":"300000"},{"s":"10000000"},{"s":"200000"},{"s":"300000"},{"s":"10000000"},{"s":"200000"},{"s":"300000"},{"s":"10000000"},{"s":"200000"},{"s":"300000"},{"s":"10000000"},{"s":"200000"},{"s":"300000"},{"s":"10000000"},{"s":"200000"},{"s":"300000"},{"s":"10000000"},{"s":"200000"},{"s":"300000"}];

  constructor() { }

  ngOnInit(): void {
  }

}
