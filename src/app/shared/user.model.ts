export class User{

    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpireDate:Date,
        public displayName?:string,
        
    ){}



    get token(){
        if(!this._token || new Date() >  this._tokenExpireDate)
            return null;
        return this._token;
    }
}