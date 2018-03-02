import { Component,OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Toastservice} from '../../providers/services/toast';
import {SqliteDbProvider} from '../../providers/sqlite-db/sqlite-db';
import { HomePage } from '../home/home';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import {LoadingController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {DialogProvider} from '../../providers/services/dialog';
/**
 * Generated class for the TestPage page.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})

export class TestPage implements OnDestroy {
  index: number = 0;
  getOptn: any; 
  getQuesnList: any;
  getQuesn:any;
  course_id: any;
  course_name: any;
  currentPage: any=1;
  answer:any=-1;
  answers:any=[];
  runtime:number=0;
  timeleft:string;
  task:any;
  query:string;
  resultdata:any;
  multiselect_options:any=[];
  showCheckbox:number;
  answer_multi:any=[];
  user_id:any;
  test_id:any;
  device_id:any;
  loader:any;
  resultJSON:any[]=new Array();
  courseType:string;
  tabBarElement:any;
  testDuration:number=30000;
  submitted:boolean=false;
  public quesNum: number =0;
  private totalPages:number = 0;
  private testType: any ;
  showTimeTestType:string[]=['E','S','V'];

  constructor(public dialog:DialogProvider,public platform:Platform,public loadingController:LoadingController,public sql:SqliteDbProvider,public toast:Toastservice,public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    if(platform.is('ios')){
    this.loader=this.loadingController.create({
      content:"Please Wait..",
      showBackdrop:true,
      spinner:'ios'
    });
  }
  if(platform.is('android')){
    this.loader=this.loadingController.create({
      content:"Please Wait..",
      showBackdrop:true,
      spinner:'dots'
    });
  }
  
    if(typeof(localStorage.getItem("deviceId"))!='undefined')
      this.device_id= localStorage.getItem("deviceId");
    else
      this.device_id=null;
    }

  ngOnDestroy(){
    if(this.submitted==false){
        this.submit();
        clearInterval(this.task);
        this.loader.dismiss();  
      }else{
    console.log("On Destory called on test.ts");
      clearInterval(this.task);
      this.loader.dismiss();
    }
    }

  ionViewDidLoad() {
    // works like intent gets the dats from course listing page 
    this.course_id = this.navParams.get('courseId');
    this.course_name = this.navParams.get('course_Name');
    this.user_id=this.navParams.get("user_id");
    this.courseType=this.navParams.get("course_type");
    console.log('ionViewDidLoad TestPage');
    //this.getTestAttributes(this.course_id);
    this.loader.present().then(()=>{
      this.getQuestion(this.course_id,this.quesNum);
      document.getElementById('loadnext').style.display='';
      document.getElementById('submit').style.display='none';    
      });  
      clearInterval(this.task);    
    if(this.showTimeTestType.indexOf(this.courseType)!=-1)  
      {
    clearInterval(this.task);    
    this.task = setInterval(() => {
      this.timeleft=this.refreshData();
    }, 1000);}
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tabBarElement.style.display = 'none';
  }


  refreshData() {
    this.runtime+=1000;
    if(this.runtime>=this.testDuration){
      console.log("Test Done");
      this.submit();
      clearInterval(this.task);
      this.navCtrl.pop();
    }
    var millisec=this.runtime;
    var hour,minutes,seconds;
    if(millisec>=3600000){
      hour='00'+Math.floor(millisec/(60*60*1000));
      millisec=millisec-(hour*60*60*1000);
    }
    else
      hour='00'+0;
    if(millisec>=60000){
      minutes='00'+Math.floor(millisec/(60*1000));
      millisec=millisec-(minutes*60*1000);
    }
    else minutes='00'+0;
    if(millisec>=1000){
      seconds='00'+Math.floor(millisec/1000);
    }
    else 
      seconds='00'+0;
    hour=hour.substr(hour.length-2,hour.length-1);
    minutes=minutes.substr(minutes.length-2,minutes.length-1);
    seconds=seconds.substr(seconds.length-2,seconds.length-1);   
    return hour+':'+minutes+':'+seconds;
  }
  //get the question for temp, will move to provider page later
  getQuestion(id:any , pageNo: any){
    console.log(this.device_id  );
    var link = 'https://test.anytimelearn.in/maPages/getTestAttribAndQuestionsIonic.php';
          var data = JSON.stringify({CourseId:id,SimId:this.device_id});
          console.log(data);
          this.http.post(link, data)
          .map(res => res.json())
          .subscribe(data => {
             // this.data.response = data;
              this.query='  Insert OR Replace into assessment(ED,Name,Questions,TI,TQ,TS) Values(?,?,?,?,?,?)';
              this.sql.dbcreate('AnytimeLearn',[this.query,[data.list.ED,data.list.Name,JSON.stringify(data.list.Questions),data.list.TI,data.list.TQ,data.list.TS]],()=>{});
              this.displayDbData(id);
              console.log(data);
            }, error => {
              console.log("Oooops!"+error);
              this.toast.showToast("Offline");
              this.displayDbData(id);
            });


  }

  displayDbData(id){
    this.query="Select * from assessment WHERE TI='"+id+"'";           
    this.sql.dbcreate('AnytimeLearn',[this.query,[]],(data)=>{
     this.resultdata=data.rows;
     for(var i=0;i<this.resultdata.item.length;i++){
     console.log(this.resultdata.item(i));
     try{
     this.resultdata.item(i).Questions=JSON.parse(this.resultdata.item(i).Questions);}
     catch(err){
       this.toast.showToast("Connection not available");
       this.ngOnDestroy();
       this.navCtrl.popToRoot();
      }
      this.test_id=this.resultdata.item(i).TI;
      this.testDuration=Number(this.resultdata.item(i).ED)*60000;
      this.getQuesnList =this.resultdata.item(i).Questions;
      this.showCheckbox=this.getQuesnList[this.quesNum].rAns.split(",").length;
      console.log("length",this.showCheckbox);    
      this.getQuesn = this.getQuesnList[this.quesNum].quen;
     this.getOptn = this.getQuesnList[this.quesNum].optn;
     this.totalPages=this.getQuesnList.length;  
     
     if(i==this.resultdata.item.length-1){
     
    for(var i=0;i<this.totalPages;i++)
    this.answers.push(-1);
                console.log(data);             
   
      }
    }
    this.loader.dismiss();
   });
  }


  getTestAttributes(id:any){
        var link = 'https://test.anytimelearn.in/maPages/getTestAttributesIonic.php';
        var data = JSON.stringify({CourseId:id,SimId:this.device_id});
        this.http.post(link, data)
        .map(res => res.json())
        .subscribe(data => {
        // this.data.response = data;
       //   console.log(data.expl);           
        }, error => {
          console.log("Oooops!"+error);
        });
  }

  submit(){
    this.submitted=false;
    this.answers[this.quesNum]=this.answer;      
    console.log(this.answers);
    var answerArray=new Array();
    for(var i=0;i<this.totalPages;i++)
      {
        if(this.answers[i]!=-1 && !Array.isArray(this.answers[i]))
          this.answers[i]=Number(this.answers[i])+1;
        if(this.answers[i]!=-1 && Array.isArray(this.answers[i]))
          {
            this.answers[i]=this.answers[i].map(function(val,k){
            return Number(val)+1;
          });
          }
          answerArray.push({
            "SeqNo":i,
             "PageNo":this.getQuesnList[i]["pageNum"],
            "Answer":Array.isArray(this.answers[i])?this.answers[i].join(":"):this.answers[i]
          });
      }
      this.resultJSON.push({
        "SimId":this.device_id,
        "CourseId":this.course_id,
        "UserId":this.user_id,
        "AnswerList":answerArray
      });
      console.log(this.resultJSON);
      console.log(JSON.stringify(this.answers));
      var link="https://test.anytimelearn.in/maPages/takeExamAnswersWithUserIdPost.php";
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
      this.loader.present().then(()=>{
      this.http.post(link,JSON.stringify(this.resultJSON))
      .subscribe(data => {
        console.log(data);if(data["_body"]=="Success"){
        this.query='  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
        this.sql.dbcreate('AnytimeLearn',[this.query,[this.test_id,link,JSON.stringify(this.resultJSON),data["_body"]]],()=>{
          this.navCtrl.pop();
        });}
        else{
          if(data["_body"]=="ERROR"){
            this.toast.showToast("User not enrolled for test");
            this.query='  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
          this.sql.dbcreate('AnytimeLearn',[this.query,[this.test_id,link,JSON.stringify(this.resultJSON),"-1"]],()=>{
            this.loader.dismiss();
            this.toast.showToast("Something went wrong.Restart the app");            
            this.navCtrl.pop();
          });  
        }
        if(data["_body"]=="ERROR_INVALID"){
          this.toast.showToast("User not enrolled for test");
          this.loader.dismiss();
          this.navCtrl.pop();
        }
        }
      }, error => {
        this.loader.dismiss();
        this.toast.showToast("Something went wrong.Contact Admin");
        console.log("Oooops!"+error);
        this.query='  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
        this.sql.dbcreate('AnytimeLearn',[this.query,[this.test_id,link,JSON.stringify(this.resultJSON),"-1"]],()=>{
          this.navCtrl.pop();
        });
      });
    });
    }

  //load next question
  loadNextQuestion(){
    console.log(this.answer);
    if(this.answer==undefined)
      this.answer=-1;
    this.getQuesnList[this.quesNum].rAns.split(",").length;    
    if(this.quesNum!=this.totalPages-1){
      if(this.getQuesnList[this.quesNum].rAns.split(",").length>1)
        this.answer=this.multiselect_options;
      this.answers[this.quesNum]=this.answer;      
      console.log("before ++",this.answer);           
      this.quesNum++;
      this.currentPage++;
        this.multiselect_options=[];       
      this.showCheckbox=this.getQuesnList[this.quesNum].rAns.split(",").length;      
      console.log(this.answer);
      console.log(this.answers);
      this.getQuesn = this.getQuesnList[this.quesNum].quen;
    this.getOptn = this.getQuesnList[this.quesNum].optn;
    this.answer=this.answers[this.quesNum];        
    console.log("after ++",this.answer);            
    if(Array.isArray(this.answer))
    this.multiselect_options=this.answer;          
  }
  if(this.quesNum==this.totalPages-1)
  {
    document.getElementById('submit').style.display='';
    document.getElementById('loadnext').style.display='none';    
  }
  }
  multiselect(event){
    if(this.multiselect_options.indexOf(event)!=-1)
      this.multiselect_options.splice(this.multiselect_options.indexOf(event),1);
    else
      this.multiselect_options.push(event);
    console.log(this.multiselect_options);
    console.log(this.answer);
    }
  //load previous question  

  isChecked(val){
 //   console.log("checking if is checked");
    if(this.multiselect_options.indexOf(val)!=-1)
      return true;
    else
      return false;
  }

  loadPreQuestion(){ 
    if(this.quesNum==0)
      this.toast.showToast("You've reached the first question");
  if(this.quesNum==this.totalPages-1)
    {
      this.answers[this.quesNum]=this.answer;         
    }
    if(this.quesNum>0){
      document.getElementById('loadnext').style.display='';
      document.getElementById('submit').style.display='none';     
      console.log("before --",this.answer);
      this.quesNum--;
      this.currentPage--;
      this.showCheckbox=this.getQuesnList[this.quesNum].rAns.split(",").length;      
      this.answer=this.answers[this.quesNum];
      console.log("after --",this.answer);      
      if(this.getQuesnList[this.quesNum].rAns.split(",").length>1)
        this.multiselect_options=this.answer;
       this.getQuesn = this.getQuesnList[this.quesNum].quen;
    this.getOptn = this.getQuesnList[this.quesNum].optn;
  }
  
  }
}
