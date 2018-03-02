import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TestPage } from '../test/test';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
import {SqliteDbProvider} from '../../providers/sqlite-db/sqlite-db';
import {DialogProvider} from '../../providers/services/dialog';
import {LoadingController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the ProfileListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-list',
  templateUrl: 'profile-list.html',
})
export class ProfileListPage {

  query:any;
  posts: any;
  temppost:any;
  storedtest:any=[];
  interval:any; 
  loadInterval:any;
  user_id:any=null;
  loader:any=null;
  tabBarElement:any;
  companyId:any;
  testType:string[]=["T","E","Y","S","V","F"];
  constructor(public navParams:NavParams,public loadingController:LoadingController,public platform:Platform, public sql:SqliteDbProvider,public navCtrl: NavController, public http: Http,public dialog:DialogProvider) {
    this.companyId = this.navParams.get('companyId');
    console.log("comapny Id",this.companyId);
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
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tabBarElement.style.display = 'flex';
    console.log("ionViewDidEnter");
    if(typeof(localStorage.getItem("userLoggedIn"))!="undefined" && localStorage.getItem("userLoggedIn")!="false" && localStorage.getItem("userLoggedIn")!=null ){
      this.loader.present().then(()=>{
        this.load();      
      }).catch((errloader)=>{
        console.log(errloader.code);
      });    
    }
  }

  ionViewWillEnter(){
    if(typeof(localStorage.getItem("userLoggedIn"))=="undefined" || localStorage.getItem("userLoggedIn")=="false"||localStorage.getItem("userLoggedIn")==null ){
     // this.navCtrl.push(LoginPage,{},()=>{console.log("displayed")});
     // this.app.getRootNav().push(LoginPage);
     this.navCtrl.push(LoginPage);
     console.log("willEnter called"); 
    }
    console.log(localStorage.getItem("userLoggedIn")); 
  }
load(){
  console.log("Load called");
        var link = 'https://test.anytimelearn.in/maPages/getEnabledProfileIonic.php';
        var data = JSON.stringify({simID:localStorage.getItem("deviceId"),companyProfile:this.companyId});
        this.sql.dbcreate('AnytimeLearn',["CREATE TABLE IF NOT EXISTS assessment(ED TEXT, Name TEXT, Questions TEXT,TI TEXT PRIMARY KEY,TQ TEXT,TS TEXT)",[]],()=>{});
        this.sql.dbcreate('AnytimeLearn',["CREATE TABLE IF NOT EXISTS submitresults(TI TEXT PRIMARY KEY,LINK VARCHAR(200),RESULTS VARCHAR(1000),RESPONSE VARCHAR(1000) DEFAULT -1)",[]],()=>{});
        this.http.post(link, data)
        .map(res => res.json())
        .subscribe(data => {
           // this.data.response = data.json;
           this.posts = data;
                        console.log(data);
          this.loader.dismiss();
                      }, error => {

          this.loader.dismiss();
             console.log("Oooops!"+error);
            this.query="Select * from assessment";         
            this.temppost=this.posts;  
            this.posts=[];  
            this.sql.dbcreate('AnytimeLearn',[this.query,[]],(data)=>{            
              for(var i=0;i<data.rows.length;i++){
                this.storedtest.push(data.rows.item(i).Name);
              }
              for(var i=0;i<this.temppost.length;i++){
                if(this.storedtest.indexOf(this.temppost[i]["c_cn"])!=-1)
                   this.posts.push(this.temppost[i]);
              }
             console.log(this.posts);
            });   
          });
    }

 loadTest(postTest) {
   console.log("postTest",postTest);
    if(postTest.c_nA=="1" && this.testType.indexOf(postTest.c_ct)!=-1 )
      this.dialog.displayDialog("Enter User Id","","Submit","",(text)=>{
        this.user_id=text;
        if(text=="" || text.toString().match(/^[a-z0-9]+$/i)==null)
          this.dialog.dialogs.alert("Enter a valid User ID");
        else{
          this.navCtrl.push(TestPage, {
            "courseId":postTest.c_id,
            "course_Name":postTest.c_cn,
            "user_id":text,
            "course_type":postTest.c_ct
          })
        }
      });
   else if(this.testType.indexOf(postTest['c_ct'])!=1){
    this.navCtrl.push(TestPage, {
      "courseId":postTest.c_id,
      "course_Name":postTest.c_cn,
      "user_id":null,
      "course_type":postTest.c_ct  
    })
  }
  }


}
