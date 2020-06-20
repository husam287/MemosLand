import { memoModel } from './memo.model';

export class MemosServiceService {

  
  //array of memories
  memos=[
    new memoModel('test',"it's a test memory hi from test",'https://bit.ly/31bypTZ',new Date(2018,3,27))
  ];
  constructor() { }
}
