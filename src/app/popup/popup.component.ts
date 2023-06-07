import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../service/master.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  closeResult = '';

	constructor(private modalService: NgbModal, private service : MasterService) {}

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result:any) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason:any) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	EmpObj:any;
	SaveEmployee(data:any){
		this.service.saveEmployee(data).subscribe(result=>{
			this.EmpObj = result;
			// console.log(this.EmpObj)
		})
	}
  ngOnInit(): void {
  }
}
