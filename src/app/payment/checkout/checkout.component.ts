import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { BraintreeService } from 'src/services/braintree.service';
import { User } from 'src/_models/userClass';
declare var braintree:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  msg:string;
  avail:boolean=false;

  msg1:string;
  avail1:boolean=false;

  listpaymentMethod;
  selected;

  // subscription variables
  subscription:string = "loading";
  subscriptionButtonDisable:boolean = false;

  addPMButtonDisable:boolean = false;
  PMremoveButtonDisable:boolean = false;



  planid:string;

  constructor(private elementRef:ElementRef, private braintreeService: BraintreeService, private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('package')=='silver') {
        this.planid = '5zn2'
      } else if(params.get('package')=='gold') {
        this.planid = '5zn2'
      } else if(params.get('package')=='platinum'){
        this.planid = '5zn2'
      } else {
        this.router.navigate(['dashboardpayment/payment'])
      }
      console.log(this.planid)
    })
    // this.checkSubscription();
    
    // getting stored payment methods
    this.braintreeService.getPaymentMethods().subscribe((methods)=>{
      console.log(methods)
      this.selected = methods[0];
      this.listpaymentMethod = methods;
    },(err)=>{
      console.log(err)
    })
    // 

    let submitButton = this.elementRef.nativeElement.querySelector('#submit-button');
    // this getClientToken() service method (GET request) calls the node js backend and get the client token that 
    // needs to initialise the Braintree SDK
    // (step 1 and 2)
    this.braintreeService.getClientToken().subscribe(token => {
      
      braintree.dropin.create({
        authorization: token,
        vaultManager: true,
        selector: '#dropin-container',
        paypal: {
          flow: 'vault'
        },
        }, (err, dropinInstance) => {
          if (err) {
            // Errors when creating Drop-in
            console.error(err);
            return;
          }
          this.avail = false;
          // this listens for any click by the user to initiate the subscription
          submitButton.addEventListener('click', () => {
            // (step 3)
            // this requestPaymentMethod() gets the user specified payment method (Card or Paypal) and sends to braintree server
            // and returns a nonce that should be sent to our node js server
            dropinInstance.requestPaymentMethod((err, payload) => {

              if (err) {
                // console.error('err', err);
                this.avail = true;
                this.msg = "Please add a payment method";
                console.log("Please add a payment method")
                return
              }

              this.avail = false;

              let user = new User();
              // let user;
              // user.name = 'Test User 1';
              // user.userName = 'test@123.com';
              user.customerid = localStorage.getItem('braintreeCusID');
              user.nonce = payload.nonce;

              this.addPMButtonDisable = true;
              // this doSubscribe() service method (POST request) calls the node js backend with the nonce
              // step 4 (step 5 will be when the server send the nonce recieved from frontend in step 4 and send it to braintree server to create a transaction)
              this.braintreeService.addPaymentMethod(user).subscribe( (user) => {
                // console.log(user)
                this.avail = false;
                this.braintreeService.getPaymentMethods().subscribe((methods)=>{
                  console.log(methods)
                  this.addPMButtonDisable = false;
                  this.selected = methods[methods.length - 1];
                  this.listpaymentMethod = methods;
                })
                // can show a successful or error message
              },
              (err)=>{
                this.addPMButtonDisable = false;
                this.avail = true;
                console.log(err)
                if(err.error=="This account has already been added as a payment method") {
                  this.msg = "This account has already been added as a payment method";
                  return;
                }
                this.msg = "something went wrong";
                setTimeout(() => {
                  this.avail = false;
                }, 10000);
              });
            });
          });
        });
    },(err)=> {
      this.avail = true;
      this.msg = "Please check your internet connection";
      setTimeout(() => {
        this.avail = false;
      }, 10000);
    });
  }

  async createSubscription() {
    this.subscriptionButtonDisable = true
    // setTimeout(() => {
    //   this.subscriptionButtonDisable = false
    // }, 10000);

    if(!this.selected) {
      return
    }

    let data = {
      paymentmethodtoken : this.selected.paymentMethodToken,
      customerid : localStorage.getItem('braintreeCusID'),
      planid: this.planid
    }

    await this.braintreeService.doSubscribe(data).subscribe( (user) => {
      console.log(user)
      this.avail = false;
      this.subscriptionButtonDisable = false
      // can show a successful or error message
    },(err) => {
      this.avail1 = true;
      this.msg1 = "Subscription could not be processed, Something went wrong";
      setTimeout(() => {
        this.avail1 = false;
      }, 10000);
      this.subscriptionButtonDisable = false
      console.log(err)
    });
  }

  onClick(item: any) {
    this.selected = item;
    // console.log(item)
  }

  // async checkSubscription(): Promise<any>{
  //   return new Promise<any>(
  //     async (resolve, reject)=>{
  //       await this.braintreeService.getSubDate().then(
  //         (obj:any) => {
  //           console.log(obj.subscriptionStatus)
  //           if(obj){
  //             if(obj['endDate']){
  //               const currentDate = new Date();
  //               if (obj.subscriptionStatus=="Cancelled") {
  //                 console.log("sad")
  //                 this.subscription = "subscriptionCancelled";
  //                 return;
  //               }
  //               if(obj['endDate'] > currentDate.toISOString()){
  //                 this.subscription = "subscribed";
  //               }
  //               else{
  //                 // window.alert("Please go to payment section and enter payment details to see this section")
  //                 this.subscription = "notsubscribed";
  //               } 
  //             }
  //             else{
  //               // window.alert("Please go to payment section and enter payment details to see this section")
  //               this.subscription = "notsubscribed";
  //             }
  //             // console.log(this.subscription)
  //             // return this.subscription
  //           }
  //         }).then(
  //         resolve
  //       )
  //     }
  //   )
  // }

  removePaymentMethod():any {

    if(!this.selected) {
      return
    }

    this.PMremoveButtonDisable = true;

    let data = {
      paymentmethodtoken : this.selected.paymentMethodToken,
      customerid : localStorage.getItem('braintreeCusID')
    }

    this.braintreeService.removePaymentMethod(data).subscribe( (response) => {
      this.avail = false;
      this.PMremoveButtonDisable = true;
      this.braintreeService.getPaymentMethods().subscribe((methods)=>{
        this.selected = methods[0];
        this.listpaymentMethod = methods;
        this.PMremoveButtonDisable = false;
      })
      // can show a successful or error message
    },(err) => {
      this.PMremoveButtonDisable = false;
      console.log(err)
    });
  }


  cancelSubscription():any{
    // this.customerID = localStorage.getItem('stripeCusID');

    this.braintreeService.cancelSubscription({userid:localStorage.getItem('userId')}).subscribe(()=>{
      console.log("done")
    },(err)=>{
      console.log(err)
    });
  }
}
