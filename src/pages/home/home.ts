import { Component} from '@angular/core';
import { App,NavController } from 'ionic-angular';
import {ProfileListPage} from '../../pages/profile-list/profile-list';
import {LoginPage} from '../../pages/login/login';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SqliteDbProvider} from '../../providers/sqlite-db/sqlite-db';
import {ServicesProvider} from '../../providers/services/services';
import {LoadingController} from 'ionic-angular';

import { Platform } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  interval:any;
  tabBarElement:any;
  profiles:any;
  displayProfiles:any[]=new Array();
  loader:any;
  constructor(public platform:Platform, public http:Http,public loadingController:LoadingController, public navCtrl:NavController,public services:ServicesProvider){
    clearInterval(this.interval);
    this.interval=setInterval(this.services.httpBackgorundResultPost(),10000);
  //remember to put the below along with present else not displayed aftr tab change

  }
  ionViewWillEnter(){
    console.log("Ion view will enter");
    if(typeof(localStorage.getItem("userLoggedIn"))=="undefined" || localStorage.getItem("userLoggedIn")=="false"||localStorage.getItem("userLoggedIn")==null ){
     // this.navCtrl.push(LoginPage,{},()=>{console.log("displayed")});
     // this.app.getRootNav().push(LoginPage);
     this.navCtrl.push(LoginPage);
     console.log("willEnter called"); 
    }
  }

  load(){
    if(window.localStorage.getItem("testTaken")!=null)
      window.localStorage.setItem("testTaken","");
    this.displayProfiles=new Array();
    var link="https://test.anytimelearn.in/maPages/profileListPost.php";
    this.http.post(link,JSON.stringify({simId:localStorage.getItem("deviceId")}))
    .map(res=>res.json())
    .subscribe(data=>{
      console.log(data);
      this.profiles=data;
      if(typeof(this.profiles)!="undefined")
        {
          this.loader.dismiss();
        for(var i=0;i<this.profiles.profileList.length;i++){
          this.profiles.profileList[i]["image"]=this.profiles.url+this.profiles.profileList[i].company_id+".png"
          this.displayProfiles.push(this.profiles.profileList[i]);
        }
        console.log(this.displayProfiles);  
        }
      },error=>{
      console.log("Ooops Error in getting profiles");
    });
  }

  submit(companyId){
    console.log(companyId);
    if(typeof(companyId)!="undefined" || companyId!=null)
      this.navCtrl.push(ProfileListPage,{
        "companyId":companyId
      });
  }

  ionViewDidEnter(){
    if(this.platform.is('ios')){
      this.loader=this.loadingController.create({
        content:"Please Wait..",
        showBackdrop:true,
        spinner:'ios'
      });
    }
    if(this.platform.is('android')){
      this.loader=this.loadingController.create({
        content:"Please Wait..",
        showBackdrop:true,
        spinner:'dots'
      });
    }
    console.log("Ion view did enter");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tabBarElement.style.display = 'flex';
    if(typeof(localStorage.getItem("userLoggedIn"))!="undefined" && localStorage.getItem("userLoggedIn")!="false" && localStorage.getItem("userLoggedIn")!=null ){
      this.loader.present().then(()=>{
        this.load();      
      }).catch((errloader)=>{
        console.log(errloader.code);
      });    
    }
  }

}
