import { Component, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empObj: any;
  constructor(private service : MasterService) { 

    this.service.getEmployee().subscribe(result=>{
      this.empObj = result;
    })
  }

  ngOnInit(): void {
  }

}
