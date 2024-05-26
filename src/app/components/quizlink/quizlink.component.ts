import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quizlink',
  templateUrl: './quizlink.component.html',
  styleUrls: ['./quizlink.component.css']
})
export class QuizlinkComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  userid;
  formid;

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userid = paramMap.get('userid');
      this.formid = paramMap.get('formid');
    });

    if(!this.userid || !this.formid) {
      this.router.navigate(['/error']);
    }
  }
}


