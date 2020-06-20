import { memoModel } from './memo.model';

export class MemosServiceService {

  
  //array of memories
  private memos=[
    new memoModel('test',"it's a test memory hi from test",'https://bit.ly/3dlmCoe',new Date(2018,3,27)),
    new memoModel('Hossam',"hiii this is me hhhh hhhhhhh hhhhhhhhhh",'https://bit.ly/2Bq6R20',new Date(2019,4,12))
  ];
  constructor() { }

  addMemo(memo:memoModel){
    this.memos.push(memo);
  }
  getMemos(){
    return this.memos.slice();
  }
  updateMemo(newMemo:memoModel,id:number){
    this.memos[id]=newMemo;
  }
  removeMemo(id:number){
    this.memos.splice(id);
  }
}
