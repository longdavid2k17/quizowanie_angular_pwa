import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizOwnershipService {

  constructor() { }

  public saveQuizId(id:any): void {
    let userIds = this.getIDs();
    if(!userIds){
      window.sessionStorage.setItem('ids', id+",");
    } else {
      userIds+=id+",";
      if(!userIds.includes(id+",")){
        window.sessionStorage.removeItem('ids');
        window.sessionStorage.setItem('ids', userIds);
      }
    }
    console.log(this.getIDs());
  }

  public getIDs(): string | null {
    return window.sessionStorage.getItem('ids');
  }
}
