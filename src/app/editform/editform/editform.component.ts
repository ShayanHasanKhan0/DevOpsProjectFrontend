import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomizequizService } from 'src/services/customizequiz.service';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {

  isloading:boolean=false;

  constructor(private customizequizservice: CustomizequizService,private route: ActivatedRoute) { }

  customizeform = {
      customizeButtons: {
        "borderRadius":"0",
        "backgroundColor":"",
        "borderColor":"",
        "color":"",//font color
      },
      ButtonLayout: 1
  }
  formid;
  buttonbg= "yellow"

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.formid = paramMap.get('formid'); 
      this.getCustomQuiz();
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
  }

  getCustomQuiz(){
    this.customizequizservice.getCustomQuiz(this.formid).subscribe((customform)=>{
      console.log(customform.customobject)
      this.customizeform.customizeButtons = customform.customobject.customizeButtons;
    });
  }

  onChange() {
    // console.log(this.customizeform)
    // this.selecttext.backgroundColor = this.customizeform.customizeButtons.backgroundColor;
    // document.documentElement.style.setProperty('buttonbg',this.customizeform.customizeButtons.backgroundColor)
    this.customizequizservice.submitChanges(this.customizeform,this.formid).subscribe((obj)=>{
      this.getCustomQuiz();
    },(err)=>{
      console.log("An error occurred while submitting changes" + err);
    });
  }

  // Layout
  changeLayout(layout: number) {
    this.customizeform.ButtonLayout = layout;
    this.customizequizservice.submitChanges(this.customizeform,this.formid).subscribe((obj)=>{
      this.getCustomQuiz();
    },(err)=>{
      console.log("An error occurred while submitting changes" + err);
    });
  }
  // template
  changeTemplate(template: number) {
    console.log(template);
    // this.customizeform.template = template;
    console.log(this.customizeform)
    this.customizequizservice.submitChanges(this.customizeform,this.formid).subscribe((msg)=>{
      this.getCustomQuiz();
    },(err)=>{
      console.log("An error occurred while submitting changes" + err);
    });
  }
}
