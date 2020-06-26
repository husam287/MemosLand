// memoModel(title,info,photo,date)

import { AngularFireStorageReference } from 'angularfire2/storage';


export class memoModel {
title:string;
info:string;
url:string;
date:Date;
id?:string;

    constructor(title:string,info:string,photo:string,date:Date,id?:string){
        this.title=title;
        this.info=info;
        this.url=photo;
        this.date=date;
        this.id=id;

    }
}
