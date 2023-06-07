import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../service/master.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  empObj:any;
  data:any;
  constructor(private service: MasterService) {
    this.GetEmployee();
    this.service.Refreshrequired.subscribe(result=>{
      this.GetEmployee();
    })
   }

  @ViewChild(ModalComponent) addView !: ModalComponent;

   GetEmployee(){
    this.service.getEmployee().subscribe(result =>{
      this.empObj = result;
    })
   }
   functionEdit(id:any){
    this.addView.LoadEditData(id);
   }
   functionDelete(id:any){
    if(confirm("Do you want to remove?")){
      this.service.removeId(id).subscribe(result=>{
        this.GetEmployee();
      })
    }
   }

  ngOnInit(): void {
  }
  haveChanges = false;

  textchange(name: any){
    if(name == ''){
      this.haveChanges = false;
    }
    else{
      this.haveChanges = true;
    }
  }

  canActivate(){
    if(this.haveChanges){
      if(confirm("you have not saved changes, do you want to navigate?")){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return true;
    }
  }
}
