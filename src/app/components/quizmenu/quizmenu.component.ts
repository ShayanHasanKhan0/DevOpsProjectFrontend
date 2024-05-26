import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuizbackendService } from 'src/services/quizbackend.service';

@Component({
  selector: 'app-quizmenu',
  templateUrl: './quizmenu.component.html',
  styleUrls: ['./quizmenu.component.css']
})
export class QuizmenuComponent implements OnInit {

  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  checkedsubmenu:string='';
  isMenuOpen=false;

  constructor(private router: Router, private quizBackend: QuizbackendService, private renderer: Renderer2) {
    // toggle submenu
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      // console.log(e)
     if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
        this.isMenuOpen=false;
     }
 });
  }
  list: [any];
  selected;
  render = false

  subMenu(item) {
    if((item._id.toString()==this.checkedsubmenu)) {
      this.isMenuOpen = !this.isMenuOpen;
    } else if (this.isMenuOpen==false) {
      this.isMenuOpen = !this.isMenuOpen;
    }
    this.checkedsubmenu = item._id;
    // this.isMenuOpen = !this.isMenuOpen;
    // console.log(this.checkedsubmenu + "   " +this.isMenuOpen)
  }
  
  /****************************** Init function ******************************/
  async ngOnInit(){
    await this.quizBackend.getList().then(
      (response: any) =>{
        if(response.list){
          console.log(response.list)
          this.list = response.list
          this.selected = this.list[0];
          this.render = true
        }
      }
    )
  }

  /****************************** Short snipets supporting other functions ******************************/

  setNode(node: any){
    for (let index = 0; index < this.list.length; index++) {
      if(this.list[index]._id.toString() === node._id.toString()){
        this.list.splice(index, 1, node)
        break
      }
    }
  }

  getNode(nodeId: string){
    for (let index = 0; index < this.list.length; index++) {
      if(this.list[index]._id.toString() === nodeId){
        return this.list[index]
      }
    } 
  }

  removeNode(id :string){
    for (let index = 0; index < this.list.length; index++) {
      if(id.toString() === this.list[index]._id.toString()){
        this.list.splice(index, 1)
        break
      }
    }
    if(this.list.length){
      this.selected = this.list[0]
    }
  }

  responseHandler(response){
    console.log(response)
    if(response.node){
      this.setNode(response.node)
    }
    this.select(this.getNode(this.selected._id.toString()))
  }

  select(node: any){
    this.selected = node
  }

  onClick(item: any) {
    this.select(item)
  }

  onDblClick(item: any) {
    this.router.navigate(['d/df/createform/' + item._id.toString()]);
  }

  /****************************** Connecting with backend functions (ASYNCS) ******************************/
  async addRoot() {
    await this.quizBackend.addNode(null, false).then(
      (response) =>{
        if(response["child"]){
          if(response["child"]._id){
            this.router.navigate(['d/df/createform/' + response["child"]._id.toString()]);
          }
        }
      }
    );
  }

  async deleteRoot(node: any) {
    if(this.list.length || !this.selected){
      this.removeNode(node._id.toString())
      await this.quizBackend.deleteNode(node.rootId, node.parentId, node._id.toString(), false).then(
        (res) => {
          console.log(res)
        }
      )
    }
    else{
      window.alert("No form is selected")
    }
  }
}
