import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { ProfileListPage } from '../profile-list/profile-list';
import {DialogProvider} from '../../providers/services/dialog';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  phoneNumber:string;
  email_doc:any;
  phoneNumber_wrong:boolean=true;
  email_wrong:boolean=true;
  disable_signin:boolean=false;
  tabBarElement:any;
  company_id:any;
  typesOfUsers:string[]=["I'm a Student","I'm a employee","I'm a general user"];
  constructor(public dialog:DialogProvider,public app:App,public deviceId:UniqueDeviceID,public http:Http, public navCtrl: NavController, public navParams: NavParams) {
    console.log("constructor");
    
  }

  submitCompanyData(val){
    console.log(val);
    var link='https://test.anytimelearn.in/maPages/deviceRegistrationIonic.php';
    var dataGen = {
      simId:localStorage.getItem("deviceId"),
      emailId:"",
      ownPhone:"",
      companyUniqueId:0,
      company_id:this.company_id};
    switch(Number(val)){
      case 1:if(this.email_wrong!=true && this.phoneNumber_wrong!=true){
        dataGen.emailId=this.username;
        dataGen.ownPhone=this.phoneNumber;
      }
      else 
        return;
        break;
      case 2:if(this.phoneNumber_wrong!=true){
        dataGen.emailId=this.phoneNumber+"@"+this.company_id;        
        dataGen.ownPhone=this.phoneNumber;
      }
      else 
        return;
      break;
      case 3:if(this.phoneNumber_wrong!=true){
        dataGen.emailId=this.username+"@"+this.company_id;
        dataGen.ownPhone=this.phoneNumber;
      }
      else 
        return;
      break;
      case 4:if(this.phoneNumber_wrong!=true){
        dataGen.emailId=this.username+"@"+this.company_id;
        dataGen.ownPhone=this.phoneNumber;
      }
      else 
        return;
      break;
    }
    this.deviceId.get()
    .then((Id:any)=>{
      localStorage.setItem("deviceId",Id);
      dataGen.simId=Id;
      var data = JSON.stringify(dataGen);
      console.log(dataGen);
      this.http.post(link, data)
      .subscribe(data => {
        console.log(data);
        if(data["_body"]=="Success"){
          localStorage.setItem("userLoggedIn","true");
          this.navCtrl.pop();         
        }
        this.username='';
        this.phoneNumber='';
      }, error => {
        console.log("Oooops!"+error);
        localStorage.setItem("userLoggedIn","false");
      this.username='';
      this.phoneNumber='';
      });
  })
    .catch((err)=>console.log("Error getting deviceId"));
  }

  radioChangeHandler(event){
    console.log(event);
    switch(Number(event)){
      case 0:document.getElementById('displayList').style.display='none';
      document.getElementById('SignIn').style.display='';
      break;
      case 1:
      this.dialog.displayConfirm('Do you have an Company ID','Message',["Yes","No"],(clicked)=>{
        switch(Number(clicked)){
          case 0://when user clicks outside the dialog.Do nothing auto handle
          break;
          case 1://when user clicks yes 
          this.setDisplayForm('EmployeeSignIn');
          break;
          case 2://when user clicks no.Do nothing auto handle
          break;
        }
      console.log("Confirm completed");
      });
            break;
      case 2:document.getElementById('displayList').style.display='none';
      document.getElementById('SignInUser').style.display='';
      break;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    document.getElementById('SignIn').style.display='none';
    document.getElementById('SignInUser').style.display='none';
    document.getElementById("EmployeeSignIn").style.display='none';
    document.getElementById("CompanySignIn1").style.display='none';
    document.getElementById("CompanySignIn2").style.display='none';
    document.getElementById("CompanySignIn3").style.display='none';
    document.getElementById("CompanySignIn4").style.display='none';
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tabBarElement.style.display = 'none';
  }

  submit(val){
      
      switch(Number(val)){
        case 0:        
        case 1:    if(this.email_wrong!=true && this.phoneNumber_wrong!=true)
        {
        var link = 'https://test.anytimelearn.in/maPages/deviceRegistrationIonic.php';
    this.deviceId.get()
      .then((Id:any)=>{
        localStorage.setItem("deviceId",Id);
        var data = JSON.stringify({
          simId:localStorage.getItem("deviceId"),
          emailId:this.username,
          ownPhone:this.phoneNumber,
          companyUniqueId:0,
          company_id:0});
          console.log(data);
        this.http.post(link, data)
        .subscribe(data => {
          if(data["_body"]=="Success"){
            localStorage.setItem("userLoggedIn","true");
            this.navCtrl.pop();         
          }
          this.username='';
          this.phoneNumber='';
        }, error => {
          console.log("Oooops!"+error);
          localStorage.setItem("userLoggedIn","false");
        this.username='';
        this.phoneNumber='';
        });
    })
      .catch((err)=>console.log("Error getting deviceId"));
    }    
        break;
        case 2:
        console.log("username",this.username);
        if(this.username!=" " ||typeof(this.username)!=null){
          console.log("exec started");
          var link = 'https://test.anytimelearn.in/maPages/getRegistrationFiledsIonic.php';
        this.company_id=this.username;
          var data=JSON.stringify({
          companyId:this.username
        });
        this.http.post(link, data)
        .subscribe(data => {
          console.log("exec",data);
            this.setDisplayForm("CompanySignIn"+data["_body"]);
          this.username='';
          this.phoneNumber='';
        }, error => {
          console.log("Oooops!"+error);
          this.username='';
          this.phoneNumber='';
        });}
        break;
      }
    

  }
  usernamecheck(val){ 
    switch(Number(val)){
      case 0: if(!this.username.match(/[a-z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z0-9]+/i))
        {
            document.getElementById('emailid').style.borderColor="red";
        this.email_wrong=true;
          } 
            else{
            document.getElementById('emailid').style.borderColor="white";
          this.email_wrong=false;
          }
            break;   
      case 1:if(!this.phoneNumber.match(/^[0-9]{10}$/))
      {
        this.phoneNumber_wrong=true;
          document.getElementById('pass_doc').style.borderColor="red";
      } 
          else{
          document.getElementById('pass_doc').style.borderColor="white";
            this.phoneNumber_wrong=false;
        }
          break;  
    }
  }
  setDisplayForm(val){
   if(val=="displayList"){
      console.log("SignIN");
      document.getElementById("SignIn").style.display='none';
      document.getElementById("displayList").style.display='';
      document.getElementById("EmployeeSignIn").style.display='none';
      document.getElementById("CompanySignIn1").style.display='none';
      document.getElementById("CompanySignIn2").style.display='none';
      document.getElementById("CompanySignIn3").style.display='none';  
      document.getElementById("CompanySignIn4").style.display='none';
      this.disable_signin=true;
    }    else if(val=="displayListUser"){
      console.log("SignINUser");
      document.getElementById("SignInUser").style.display='none';
      document.getElementById("displayList").style.display='';
      document.getElementById("EmployeeSignIn").style.display='none';
      document.getElementById("CompanySignIn1").style.display='none';
      document.getElementById("CompanySignIn2").style.display='none';
      document.getElementById("CompanySignIn3").style.display='none';
      document.getElementById("CompanySignIn4").style.display='none';
      this.disable_signin=true;
    }else if(val=="EmployeeSignIn"){
      document.getElementById("SignInUser").style.display='none';
      document.getElementById("displayList").style.display='none';
      document.getElementById("EmployeeSignIn").style.display='';
      document.getElementById("CompanySignIn1").style.display='none';
      document.getElementById("CompanySignIn2").style.display='none';
      document.getElementById("CompanySignIn3").style.display='none';
      document.getElementById("CompanySignIn4").style.display='none';
    }
    else if(val=="CompanySignIn1"){
      document.getElementById("SignInUser").style.display='none';
      document.getElementById("displayList").style.display='none';
      document.getElementById("EmployeeSignIn").style.display='none';
      document.getElementById("CompanySignIn1").style.display='';
      document.getElementById("CompanySignIn2").style.display='none';
      document.getElementById("CompanySignIn3").style.display='none';
      document.getElementById("CompanySignIn4").style.display='none';
    }

    else if(val=="CompanySignIn2"){
      document.getElementById("SignInUser").style.display='none';
      document.getElementById("displayList").style.display='none';
      document.getElementById("EmployeeSignIn").style.display='none';
      document.getElementById("CompanySignIn1").style.display='none';
      document.getElementById("CompanySignIn2").style.display='';
      document.getElementById("CompanySignIn3").style.display='none';
      document.getElementById("CompanySignIn4").style.display='none';
    }

    else if(val=="CompanySignIn3"){
      document.getElementById("SignInUser").style.display='none';
      document.getElementById("displayList").style.display='none';
      document.getElementById("EmployeeSignIn").style.display='none';
      document.getElementById("CompanySignIn1").style.display='none';
      document.getElementById("CompanySignIn2").style.display='none';
      document.getElementById("CompanySignIn3").style.display='';
      document.getElementById("CompanySignIn4").style.display='none';
    }

    else if(val=="CompanySignIn4"){
      document.getElementById("SignInUser").style.display='none';
      document.getElementById("displayList").style.display='none';
      document.getElementById("EmployeeSignIn").style.display='none';
      document.getElementById("CompanySignIn1").style.display='none';
      document.getElementById("CompanySignIn2").style.display='none';
      document.getElementById("CompanySignIn3").style.display='none';
      document.getElementById("CompanySignIn4").style.display='';
    }
  }
}
