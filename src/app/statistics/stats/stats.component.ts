import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizbackendService } from 'src/services/quizbackend.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private router: Router, private quizBackend: QuizbackendService) { }
  list: [any];
  selected;
  render = false;
  p: number = 1;
  
  /****************************** Init function ******************************/
  async ngOnInit(){
    await this.quizBackend.getList().then(
      (response: any) =>{
        if(response.list){
          this.list = response.list
          console.log(this.list)
          this.selected = this.list[0];
          this.render = true
        }
      }
    )
  }

  loading:boolean=true;

  ngAfterViewInit():void {
    setTimeout(() => {
      this.loading=false;
    }, 0);
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
    this.router.navigate(['chart/' + item._id.toString()]);
  }

  /****************************** Connecting with backend functions (ASYNCS) ******************************/
  async addRoot() {
    await this.quizBackend.addNode(null, false).then(
      (response) =>{
        if(response["child"]){
          if(response["child"]._id){
            this.router.navigate(['chart/' + response["child"]._id.toString()]);
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
