// memoModel(title,info,photo,date)


export class memoModel {
title:string;
info:string;
url:string;
date:Date;
id?:any;

    constructor(title:string,info:string,photo:string,date:Date){
        this.title=title;
        this.info=info;
        this.url=photo;
        this.date=date;

    }
}
