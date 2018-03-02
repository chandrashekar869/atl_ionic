import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TestPage } from '../pages/test/test';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesProvider } from '../providers/services/services';
import { SqliteDbProvider } from '../providers/sqlite-db/sqlite-db';
import { SQLite} from '@ionic-native/sqlite';
import {Toastservice} from '../providers/services/toast';
import {DialogProvider} from '../providers/services/dialog';
import { Dialogs } from '@ionic-native/dialogs';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LoginPage } from '../pages/login/login';
import { ProfileListPage } from '../pages/profile-list/profile-list';
import { EmailComposer } from '@ionic-native/email-composer';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ProfileListPage,
    TabsPage,
    TestPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    HomePage,
    ProfileListPage,
    TabsPage,
    TestPage
  ],
  providers: [
    UniqueDeviceID,
    Toastservice,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,
    SqliteDbProvider,
    DialogProvider,
    EmailComposer,
    SQLite,
    Dialogs
  ]
})
export class AppModule {}
