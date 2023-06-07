import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../service/master.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  closeResult = '';

  constructor(private modalService: NgbModal, private service: MasterService) { }

  @ViewChild ('content') addview !: ElementRef

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  designation:any;
  getDesignation(){
    this.service.GetDesignation().subscribe(result=>{
      this.designation = result;
    })
  }
  empObj: any;
  errorMessage = '';
  errorClass = '';
  successMessage = '';
  successClass = '';
  saveresponse: any;

  empForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phone: new FormControl(),
    designation: new FormControl(),
  });
  saveEmployees() {
    this.service.saveEmployee(this.empForm.value).subscribe(result=>{
      console.log(result);
      if (this.empForm.valid) {
        this.service
          .saveEmployee(this.empForm.getRawValue())
          .subscribe((result: HttpResponse<any>) => {
            this.saveresponse = result;
            console.log(result);
            if (result.status == 201) {
              this.successMessage = 'Data added successfully!';
              this.successClass = 'successMessage';
            } else {
              this.errorMessage = 'Failed to load';
              this.errorClass = 'errorMessage';
            }
          });
      } else {
        this.errorMessage = 'Failed!';
        this.errorClass = 'errorMessage';
      }
    })
  }

  

  editData: any;

  LoadEditData(id: any) { 
    this.open();
    this.service.getEmployeeById(id).subscribe((result) => {
      this.editData = result;

      this.empForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        email: this.editData.email,
        phone: this.editData.phone,
        designation: this.editData.designation,
      });
    });
  
    console.log(id);
  }

  ClearForm(){
    this.empForm.setValue({
      id: 0,
      name: "",
      email: "",
      phone: "",
      designation: "",
    });
  }

  open() {
    this.ClearForm();
    this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => { },
        (reason) => { }
      );
  }

  get name() {
    return this.empForm.get('name');
  }
  get email() {
    return this.empForm.get('email');
  }
  ngOnInit(): void { 
    this.getDesignation();
  }
}
