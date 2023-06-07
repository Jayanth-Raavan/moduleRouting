import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private _refreshRequired = new Subject<void>();

  get Refreshrequired(){
    return this._refreshRequired;
  }
  constructor(private http: HttpClient) { }
  IsLoggedIn(){
    const username = localStorage.getItem("username");
    if(username == '' || username == null)
      return false
    else
      return true;
      
    }
    HaveRoleAccess(menu:string){
      const role = localStorage.getItem('role');
      if(role == 'admin'){
        return true;
      }
      else if(menu == 'contact'){ // it allows contact for everyone (open for all)
        return true;
      }
      else return false;
      
    }
    apiUrl ="http://localhost:3001/employees";
    desUrl = "http://localhost:3000/designation";
    getEmployee(){
      return this.http.get(this.apiUrl);
    }
    saveEmployee(data:any){
      return this.http.post(this.apiUrl,data,{observe : 'response'}).pipe(tap(()=>{
        this._refreshRequired.next();
      }));
    }
    getEmployeeById(id:number){
      return this.http.get(this.apiUrl+'/'+id);
    }
    removeId(id:number){
      return this.http.delete(this.apiUrl+'/'+id);
    }
    GetDesignation(){
      return this.http.get(this.desUrl);
    }
  }


