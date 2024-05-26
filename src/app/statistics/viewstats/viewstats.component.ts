import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizbackendService } from 'src/services/quizbackend.service';
import { ChartElement } from '../../../_models/ChartElement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewstats',
  templateUrl: './viewstats.component.html',
  styleUrls: ['./viewstats.component.css']
})
export class ViewstatsComponent implements OnInit, AfterViewInit {
  value;//

  isloading:boolean=false;
  /* Variables for chart rendering */
  // colors = ['#9E9E9E', '#388E3C', '#4527A0', '#EF6C00'];
  colors = ['#B99E9B', '#7E9BA9', '#79BEB3', '#EC9B87'];
  chart: ElementRef<SVGElement>;  
  list: [any];
  chartElementList: ChartElement[] = [];
  WIDTH = 300;
  HEIGHT = 300;
  ELEMENT_WIDTH = 150;
  ELEMENT_HEIGHT = 75;

  ELEMENT_BLAH_HEIGHT = 0;

  PADDING = 10;
  zoom = 1;
  ZOOM_FACTOR = 1.2;
  dragMode = false;
  pan = false;
  moveMode = false;
  startX = 0;
  startY = 0;
  x0 = 0;
  y0 = 0;
  x = 0;
  y = 0;
  viewBox = `${this.x} ${this.y} ${this.WIDTH} ${this.HEIGHT}`;

  /* Variables for function rendering */
  rootId: string
  root
  selected
  children = [];
  product = {
    title: "",
    description: "",
    imageName: "",
    link: "",
    href: ""
  }

  componentTypes = ['Question', 'Product', 'Reference']
  questionTypes = ['User Input', 'Select Text', 'Select Image', 'Range Slider']
  questionTypeMenuFlag = false;
  userInputs = ['Name', 'Email', 'Phone no.', 'Text']
  userInputMenuFlag = false;
  childSelectText = "";
  childRangeFrom;
  childRangeTo;
  childSelectImageName = "";
  childSelectImageForm;
  productFields = ['title', 'description', 'image', 'link', 'href']
  childProductImageForm;
  
  temp;

  // variables note currently used but will be
  msg = "";
  msgFlag = false;
  msgSuccess = false;
  addChildButton = true

  render = false
  
  constructor(private router: Router, private route: ActivatedRoute, private quizBackend: QuizbackendService) { }

  /****************************** Init function ******************************/
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      async (paramMap) => {
        this.rootId = String(paramMap.get('id'));
        if(this.rootId){
          await this.quizBackend.initialisestats(this.rootId).then(
            (response: any) => {
              console.log(response)
              this.root = response.node
              this.list = response.list
              this.select(this.root)
              this.chartElementList = this.setChartElementList(this.list, this.root)
              this.render = true
            }
          )
        }
        else {
          this.router.navigate(['errorpage'], {replaceUrl: true});
        }
      }
    );
  }

  /****************************** Short snipets supporting other functions ******************************/
  setTemp(value){
    this.temp = value
  }

  getNode(nodeId: string){
    if(this.isRoot(nodeId)){
      return this.root
    }
    else{
      for (let index = 0; index < this.list.length; index++) {
        if(this.list[index]._id.toString() === nodeId){
          return this.list[index]
        }
      } 
    }
  }

  setNode(node: any){
    if(this.isRoot(node._id.toString())){
      this.root = node
    }
    else{
      for (let index = 0; index < this.list.length; index++) {
        if(this.list[index]._id.toString() === node._id.toString()){
          this.list.splice(index, 1, node)
          break
        }
      }
    }
  }

  addNode(node: any){
    this.list.push(node)
  }

  removeNode(id :string){
    for (let index = 0; index < this.list.length; index++) {
      if(id.toString() === this.list[index]._id.toString()){
        this.list.splice(index, 1)
        break
      }
    }
  }

  removeChildren(parentId :string){
    for (let index = 0; index < this.list.length; index++) {
      if(parentId === this.list[index].parentId){
        this.list.splice(index, 1)
        index -= 1
      }
    }
  }

  cloneList(){
    let temp = []
    for (let index = 0; index < this.list.length; index++) {      
      temp.push(Object.assign({}, this.list[index]))
    }
    return temp
  }

  cloneRoot(){
    return Object.assign({}, this.root)
  }

  getHighestChildren(id: string){
    let highest;
    let temp = true
    for (let index = 0; index < this.list.length; index++) {
      if(this.list[index].parentId === id){
        if(temp){
          highest = this.list[index].rangeTo
          temp = false
        }
        else if(this.list[index].rangeTo > highest){
          highest = this.list[index].rangeTo
        }
      }
    }
    return highest
  }

  getChildren(list: any, id: string){
    var temp = [];
    if(list){
      for (let index = 0; index < list.length; index++) {
        if(list[index].parentId === id){
          temp.push(list[index])
        }
      }
    }
    return temp
  }

  select(node: any){
    this.selected = node
    if(this.selected.componentType === "Question"){
      if(this.selected.questionType === "Range Slider"){
        if(!this.selected.hasChild){
          this.childRangeFrom = null;
        }
        else{
          let temp =  this.getHighestChildren(this.selected._id.toString());
          this.childRangeFrom = temp + 1;
        }
        this.childRangeTo = null;
      }
      else if(this.selected.questionType === "Select Text"){
        this.childSelectText = ""
      }
      else if(this.selected.questionType === "Select Image"){
        this.childSelectImageName = "";
        this.childSelectImageForm = null;
      }
      if(this.selected.hasChild){
        this.children = this.getChildren(this.list, this.selected._id.toString())
      }
      else{
        this.children = []
      }
    }
    else if(this.selected.componentType === "Product"){
      this.children = []
      this.childProductImageForm = null
      this.product.title = ""
      this.product.description = ""
      this.product.imageName = ""
      this.product.link = ""
      this.product.href = ""
    }
  }

  getSibling(type: string, node: any){
    let temp = 0;
    let flag = false
    for (let index = 0; index < this.list.length; index++) {
      if(this.list[index].parentId === node.parentId){
        if(this.list[index]._id.toString() === node._id.toString()){
          if(type === "rangeFrom" && temp){
            return this.list[temp]
          }
          if(!flag && type === "rangeTo"){
            flag = true
          }
        }
        else{
          if(type === "rangeFrom"){
            temp = index;
          }
          if(flag && type === "rangeTo"){
            return this.list[index]
          }
        }
      }
    }
  }

  isRoot(id: string){
    if(id === this.rootId){
      return true
    }
    return false
  }

  onSelectComponentType(component: string){
    if(component !== this.selected.componentType){
      this.selected.componentType = component
      if(component === "Question"){
        this.selected.userInput = "Name"
      }
      else{
        delete this.selected.userInput
      }
      if(component === "Product"){
        this.selected.products = []
      }
      else{
        delete this.selected.products
      }
      this.updateNode( {
        _id: this.selected._id.toString(),
        rootId: this.selected.rootId,
        componentType: component },
        "componentType"
      )
    }
  }

  onClickQuestionType(event){
    event.stopPropagation();
    this.questionTypeMenuFlag = !this.questionTypeMenuFlag
    this.userInputMenuFlag = false
  }
  onSelectQuestionType(question: string){
    if(question !== this.selected.questionType){
      this.selected.questionType = question
      if(question === "Range Slider"){
        this.childRangeFrom = null;
        this.childRangeTo = null;
      }
      if(question === "User Input"){
        this.selected.userInput = "Name"
      }
      else{
        delete this.selected.userInput
      }
      this.updateNode( {
        _id: this.selected._id.toString(),
        rootId: this.selected.rootId,
        questionType: question },
        "questionType"
      )
    }
  }

  onClickUserInput(event){
    event.stopPropagation();
    this.userInputMenuFlag = !this.userInputMenuFlag
    this.questionTypeMenuFlag = false
  }
  onSelectUserInput(input: string){
    if(input !== this.selected.userInput){
      this.selected.userInput = input
      this.updateNode( {
        _id: this.selected._id.toString(),
        rootId: this.selected.rootId,
        userInput: input },
        "userInput"
      )
    }
  }

  objectConverter(obj: any, type: string){
    if(type === "Select Text"){
      obj.selectText = this.childSelectText
    }
    else if(type === "Range Slider"){
      obj.rangeFrom = this.childRangeFrom;
      obj.rangeTo = this.childRangeTo;
    }
    return obj
  }

  childSelectImageUpload(event){
    this.childSelectImageForm = new FormData()
    if( event.target.files.length){
      this.childSelectImageName = event.target.files[0].name.toString();
      this.childSelectImageForm.append('optionImage', event.target.files[0], event.target.files[0].name);
    }
  }

  childProductImageUpload(event){
    this.childProductImageForm = new FormData()
    if( event.target.files.length){
      this.product.imageName = event.target.files[0].name.toString()
      this.childProductImageForm.append('productImage', event.target.files[0], event.target.files[0].name);
    }
  }

  editRange(node: any, type: string){
    let temp = this.getSibling(type, node)
    var object = { _id: node._id.toString() }
    if(node.rangeTo < node.rangeFrom){
      if(type === "rangeFrom"){
        node.rangeFrom = this.temp
      }
      else{
        node.rangeTo = this.temp
      }
      console.log("From cannot be greater than To")
      return
    }
    if(temp){
      if(type === "rangeFrom"){
        if(node.rangeFrom <= temp.rangeFrom + 1){
          node.rangeFrom = this.temp
          console.log("conflicting with previous range")
          return
        }
      }
      else{
        if(node.rangeTo >= temp.rangeTo - 1){
          node.rangeTo = this.temp
          console.log("conflicting with next range")
          return
        }
      }
    }
    object["rootId"] = node.rootId
    object[type] = node[type]
    if(temp){
      if(type === "rangeFrom"){
        temp.rangeTo = node.rangeFrom - 1
        object["rangeTo"] = temp.rangeTo
        object["prev"] = temp._id.toString()
      }
      else{ 
        temp.rangeFrom = node.rangeTo + 1
        object["rangeFrom"] = temp.rangeFrom
        object["next"] = temp._id.toString()
      }      
    }
    this.updateNode(object, type)
  }

  responseHandler(response: any){
    console.log("responded")
    console.log(response)
    if(response.node){
      this.setNode(response.node)
    }
    if(response.extra){
      this.setNode(response.extra)
    }
    if(response.child){
      this.addNode(response.child)
    }
    if(response.list){
      this.list = response.list
    }
    this.select(this.getNode(this.selected._id.toString()))
    console.log(this.selected)
    this.chartElementList = this.setChartElementList(this.list, this.root);
  }

  visualize(task: string, node: any, productId: string){
    var temp = this.cloneList();
    var root = this.cloneRoot();
    if(task === "delete product"){
      for (let index = 0; index < node.products.length; index++) {
        if(node.products[index]._id.toString() === productId){
          node.products.splice(index, 1)
          break
        }
      }
      for (let index = 0; index < temp.length; index++) {
        if(node._id.toString() === temp[index]._id.toString()){
          temp.splice(index, 1, node)
          break
        }
      }
    }
    if(task === "add"){
      if(this.isRoot(node.parentId)){
        if(!root.hasChild){
          root.hasChild = true
        }
      }
      else{
        for (let index = 0; index < temp.length; index++) {
          if(node.parentId === temp[index]._id.toString()){
            if(!temp[index].hasChild){
              temp[index].hasChild = true
            }
            break
          }
        }
      }
      temp.push(node)
      this.children.push(node)
    }
    this.chartElementList = this.setChartElementList(temp, root);
  }

  click(event, item: any) {
    event.stopPropagation();
    if(item._id){
      if(item._id !== this.selected._id){
        this.select(item)
      }
    }
    console.log(item)
  }

  prompt(type: string, msg: string){
    console.log(msg)
  }

  /****************************** Connecting with backend functions (ASYNCS) ******************************/
  async addChild(parent: any){
    if(parent.questionType === "Range Slider"){
      if(this.childRangeFrom == null || this.childRangeTo == null){
        console.log("please enter values for range")
        return
      }
      else if(this.childRangeFrom > this.childRangeTo){
        console.log("please enter valid values for range")
        return
      }
    }
    if(parent.questionType === "Select Text" && this.childSelectText.trim() === ""){
      console.log("Answer cannot be empty")
      return
    }
    this.addChildButton = false
    var defaultObj = {
      parentId: parent._id.toString(),
      rootId: this.rootId,
      level: parent.level + 1,
    }
    if(parent.questionType === "Select Image"){
      if(this.childSelectImageForm){
        for (let [key, value] of Object.entries(defaultObj)) {
          this.childSelectImageForm.append(`question[${key}]`, `${value}`);
        }
        await this.quizBackend.addImageNode(this.childSelectImageForm, !parent.hasChild).then(
          (response) =>{
            if(!response["msg"]){
              this.responseHandler(response)
            }
          }
        )
      }
      else{
        console.log("image not found")
      }
    }
    else{
      let temp = defaultObj
      temp['componentType'] = "Question"
      this.visualize("add", temp, "")
      if(parent.questionType === "Range Slider" || parent.questionType == "Select Text"){
        defaultObj = this.objectConverter(defaultObj, parent.questionType)
      }
      await this.quizBackend.addNode(defaultObj, !parent.hasChild).then(
        (response) =>{
          if(!response["msg"]){
            this.responseHandler(response)
          }
        }
      )
    }
    this.addChildButton = true
  }

  async addProduct(nodeId, rootId, product){
    if(this.childProductImageForm){
      for (let [key, value] of Object.entries(product)) {
        this.childProductImageForm.append(`product[${key}]`, `${value}`); 
      }
      await this.quizBackend.addProduct(this.childProductImageForm, nodeId, rootId).then(
        (response) =>{
          if(!response["msg"]){
            this.responseHandler(response)
          }
        }
      )
    }
    else{
      console.log("image not found")
    }
  }

  async updateNode(node: any, type: string) {
    if(type === "questionType" || type === "componentType"){
      this.removeChildren(node._id.toString())
      this.children = []
      this.visualize(null, null, null)
    }
    await this.quizBackend.updateNode(node, type).then(
      (response) => {
        if(!response["msg"]){
          this.responseHandler(response)
        }
      }
    )
  }

  async updateNodeImage(event, rootId:string, id: string){
    const formData = new FormData()
    if(event.target.files.length){
      formData.append('optionImage', event.target.files[0], event.target.files[0].name);      
      await this.quizBackend.updateNodeImage(formData, rootId, id).then(
        (response) => {
          if(!response["msg"]){
            this.responseHandler(response)
          }
        }
      )
    }
  }

  async deleteNode(node: any, type: string){
    if(node._id.toString() && node.rootId && node.parentId){
      if(!this.isRoot(node._id.toString())){
        let temp = false
        if((node.rangeFrom || node.rangeFrom === 0) && (node.rangeTo || node.rangeTo === 0)){
          temp = true
        }
        this.removeNode(node._id.toString())
        if(type === "child"){
          this.visualize(null, null, null)
          for (let index = 0; index < this.children.length; index++) {
            if(node._id.toString() === this.children[index]._id.toString()){
              this.children.splice(index, 1)
              break
            }
          }
        }
        else if(type === "self"){
          this.visualize(null, null, null)
          this.select(this.getNode(node.parentId))
        }
        await this.quizBackend.deleteNode(node.rootId, node.parentId, node._id.toString(), temp).then(
            (response) =>{
              if(!response["msg"]){
                this.responseHandler(response)
              }
            }
        )
      }
    }
  }

  async deleteProduct(nodeId: string, productId: string){
    this.visualize("delete product", this.getNode(nodeId), productId)
    await this.quizBackend.deleteProduct(nodeId, productId).then(
      (response) =>{
        console.log(response)
        if(!response["msg"]){
          this.responseHandler(response)
        }
      }
    )
  }

/****************************** Chart rendering functions (WARNING!!!) ******************************/
  setChartSize() {
    if (this.chart) {
      this.WIDTH = this.chart.nativeElement.clientWidth;
      this.HEIGHT = this.chart.nativeElement.clientHeight;
      this.setViewBox();
      this.chartElementList = this.setChartElementList(this.list, this.root);
    }
  }

  ngAfterViewInit() {
    window.setTimeout(() => this.setChartSize());
  }

  @HostListener('window:resize')
  onResize() {
    this.setChartSize();
  }

  setViewBox() {
    this.viewBox = `${this.x * this.zoom} ` +
      `${this.y * this.zoom} ` +
      `${this.WIDTH * this.zoom} ` + 
      `${this.HEIGHT * this.zoom}`;
  }

  onZoomIn() {
    this.zoom /= this.ZOOM_FACTOR;
    this.setViewBox();
  }

  onZoomOut() {
    this.zoom *= this.ZOOM_FACTOR;
    this.setViewBox();
  }

  onPan() {
    this.dragMode = !this.dragMode;
  }

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent) {
    if (this.questionTypeMenuFlag) {
      this.questionTypeMenuFlag = false
    }
    if (this.userInputMenuFlag) {
      this.userInputMenuFlag = false
    }
  }

  onMouseDown(event) {
    if (this.dragMode) {
      this.moveMode = true;
      this.x0 = this.x;
      this.y0 = this.y;
      this.startX = event.clientX;
      this.startY = event.clientY;
    }
  }

  onMouseUp() {
    if (this.dragMode) {
      this.moveMode = false;
    }
  }

  onMouseMove(event) {
    if (this.moveMode) {
      let dx, dy;
      dx = event.clientX - this.startX;
      dy = event.clientY - this.startY;
      this.x = this.x0 - dx / this.zoom;
      this.y = this.y0 - dy / this.zoom;
      this.setViewBox();
    }
  }
  
  setChartElementList(list: any[], root: any): ChartElement[] {
    const result: ChartElement[] = [];
    const x = this.WIDTH / 2;
    const y = this.ELEMENT_HEIGHT;
    const rootNode: ChartElement = {
      item: root,
      x: x,
      y: y,
      childrenCount: 0,
      category: 0
    }
    result.push(rootNode);
    this.setChildren(result, rootNode, list);
    this.shiftChartElemens(result);
    this.setConnection(result);
    return result;
  }

  setChildren(result: ChartElement[], parent: ChartElement, list: any[]) {
    if(!Array.isArray(this.list) || !parent.item.hasChild){
      return
    }
    const children = list.filter(item => item.parentId === parent.item._id);
    parent.childrenCount = children.length;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const offset = parent.x - (children.length - 1) / 2 * (this.ELEMENT_WIDTH + this.PADDING *2);
      const element = {
        x: offset + (this.ELEMENT_WIDTH + this.PADDING * 2) * i,
        y: parent.y + this.ELEMENT_HEIGHT * 2,
        item: child,
        parent: parent,
        category: parent.category || i + 1,
        childrenCount: 0
      };
      result.push(element);
      this.setChildren(result, element, list);
    }
  }

  setConnection(list: ChartElement[]) {
    for (let e of list) {
      if (e.parent && e.item.level) {
        e.connection = `M ${e.x} ${e.y - this.ELEMENT_HEIGHT / 2} `+
          `C ${e.x} ${e.y - this.ELEMENT_HEIGHT}, ` +
          `${e.parent.x} ${e.parent.y + this.ELEMENT_HEIGHT}, ` +
          `${e.parent.x} ${e.parent.y + this.ELEMENT_HEIGHT / 2}`
      }
    }
  }

  compareElements = (a: ChartElement, b: ChartElement) => {
    if (!a.parent || !b.parent) {
      return 0;
    }
    if (a.parent.x < b.parent.x) {
      return 1;
    }
    if (a.parent.x > b.parent.x) {
      return 1;
    }
    if (a.x < b.x) {
      return -1;
    }
    return 1;
  };

  shiftChartElemens(list: ChartElement[]) {
    let level = 1;
    while(true) {
      let offset = 0;
      const elementList = list.filter(e => e.item.level === level);
      if (!elementList.length) {
        break;
      }
      elementList.sort(this.compareElements);
      for (let i = 0; i < elementList.length - 1; i++) {
        let element = elementList[i];
        let sibling = elementList[i + 1];
        let space = sibling.x - this.ELEMENT_WIDTH - 2 * this.PADDING - element.x;
        if (space < 0) {
          sibling.x -= space;
          list.filter(e => e.parent === element).forEach(e => e.x -= space);
          offset = Math.max(-space, offset);
        }
      }
      list.filter(e => e.item.level >= level).forEach(e => e.x -= offset / 2);
      level++;
    }
  }
}
