import { ToastController } from 'ionic-angular';
import { Component,Injectable } from '@angular/core';

@Injectable()
export class Toastservice{
constructor(private toastCtrl: ToastController) {
    console.log('toast called');
}
showToast(message){
    let toast=this.toastCtrl.create({
        message:message,
        duration:3000,
        position:'bottom'
    });
    toast.onDidDismiss(()=>{
        console.log('Toast closed');
    });
    toast.dismissAll();
    toast.present();
}
}