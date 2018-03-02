import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestPage } from './test';
import {Toastservice} from '../../providers/services/toast';
import {SqliteDbProvider} from '../../providers/sqlite-db/sqlite-db'
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    IonicPageModule.forChild(TestPage),
  ],
  providers:[Toastservice,SqliteDbProvider,UniqueDeviceID]
})
export class TestPageModule {}
