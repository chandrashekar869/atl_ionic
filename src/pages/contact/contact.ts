import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
emailAvailable:boolean=false;
  constructor(public email:EmailComposer,public navCtrl: NavController) {
    this.email.isAvailable().then((available:boolean)=>{
      if(available){
        this.emailAvailable=available;
      }
    })
  }
  sendEmail(){
    let emailData={
      to:"merdekarswati@gmail.com",
      subject:"Hello",
      body:"",
      isHtml:true
    };
  this.email.open(emailData);
  }
}
