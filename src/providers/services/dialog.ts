import { Dialogs ,DialogsPromptCallback} from '@ionic-native/dialogs';
import{Component,Injectable} from '@angular/core';

@Injectable()
export class DialogProvider
{
    constructor(public dialogs:Dialogs){
        
    }
    displayDialog(message,title,buttonLabel,hint,callback){
        this.dialogs.prompt(message,title,buttonLabel,hint)
        .then((text)=>{console.log("Dialog executed",text);callback(text.input1);})
        .catch((err)=>{console.log("Dialog error")});
    }
    displayConfirm(message:string,title:string,buttonLabel:string[],callback:any){
        this.dialogs.confirm(message,title,buttonLabel)
        .then((clickedOption)=>{
            console.log('Clicked is',clickedOption);
            callback(clickedOption);
        })
        .catch((err)=>{console.log("Error occured in confirm")});
    }
}


