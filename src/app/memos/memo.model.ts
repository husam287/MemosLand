// memoModel(title,info,photo,date)


export class memoModel {
title:string;
info:string;
photo:string;
date:Date;

    constructor(title:string,info:string,photo:string,date:Date){
        this.title=title;
        this.info=info;
        this.photo=photo;
        this.date=date;

    }
}
