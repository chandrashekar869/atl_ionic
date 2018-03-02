import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
  Generated class for the SqliteDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SqliteDbProvider {

  sqliteobject:any;
  constructor(private sqlite:SQLite){

  }
  dbcreate(dbname,query,callback){
      this.sqlite.create({
          name:dbname+'.db',
          location:'default'
      }).then((db:SQLiteObject)=>{
      
        db.executeSql(query[0],query[1]).then((data)=>{console.log("SQL exec successfull",data);callback(data);})
        .catch(e=>console.log(e));
      }).catch(e=>console.log(e));
  
}
}
