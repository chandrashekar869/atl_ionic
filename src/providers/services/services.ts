import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SqliteDbProvider} from '../../providers/sqlite-db/sqlite-db';
@Injectable()
export class ServicesProvider {
resultdata:any;
query:any;
  constructor(public http: Http,public sqlite:SqliteDbProvider) {
    console.log('Hello ServicesProvider Provider');
  }
  httpBackgorundResultPost(){
    this.sqlite.dbcreate('AnytimeLearn',["Select * from submitresults where RESPONSE='-1'",[]],(data)=>{
      this.resultdata=data.rows;
      for(var i=0;i<this.resultdata.item.length;i++){
        console.log("from services",this.resultdata.item(i));
        this.http.post(this.resultdata.item(i).LINK,this.resultdata.item(i).RESULTS).subscribe(data=>{
          console.log(data);
          if(data["_body"]=="Success"){
          this.query='  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
          this.sqlite.dbcreate('AnytimeLearn',[this.query,[this.resultdata.item(i).TI,this.resultdata.item(i).LINK,this.resultdata.item(i).RESULTS,data["_body"]]],()=>{
          });}
          else{ console.log(data);
            
            this.query='  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
            this.sqlite.dbcreate('AnytimeLearn',[this.query,[this.resultdata.item(i).TI,this.resultdata.item(i).LINK,this.resultdata.item(i).RESULTS,"-1"]],()=>{
            });  
          }
        },error=>{
          console.log("Ooops error");
          this.query='  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
          this.sqlite.dbcreate('AnytimeLearn',[this.query,[this.resultdata.item(i).TI,this.resultdata.item(i).LINK,this.resultdata.item(i).RESULTS,"-1"]],()=>{
          });
        });
      }
    });
  }
}
