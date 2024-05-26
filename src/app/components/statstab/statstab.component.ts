import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statstab',
  templateUrl: './statstab.component.html',
  styleUrls: ['./statstab.component.css']
})
export class StatstabComponent implements OnInit {

  selectedpage:number;

  constructor(private router: ActivatedRoute) { }

  formid:string;

  userid:string = localStorage.getItem('userId');

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.formid = paramMap.get('id');
      // this.getCustomQuiz();
      // console.log(this.formid)
      // if (formid) {
      //   if(this.quizBackend.isPresentinFormNodes(String(formid))){
      //     this.formid = String(formid);
      //     this.getList();
      //   }
      //   else{
      //     this.router.navigate(['errorpage'], {replaceUrl: true});
      //   }
      // }
    });
    this.router.url.subscribe((obj:any)=>{
      if (obj[0].path=='viewstatstab') {
        this.selectedpage = 1;
      }
      else if(obj[0].path=='responses') {
        this.selectedpage = 2;
      }
      // else if(obj[0].path=='viewstatstab') {
      //   this.selectedpage = 3;
      // }
      // else if(obj[0].path=='link') {
      //   this.selectedpage = 4;
      // }
      // console.log(obj[0].path=='createform');
    })
  }

}
