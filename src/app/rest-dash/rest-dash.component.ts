import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Restaurent } from '../models/restaurent.model';
import { RestaurentApiService } from '../services/restaurent-api.service';

@Component({
  selector: 'app-rest-dash',
  templateUrl: './rest-dash.component.html',
  styleUrls: ['./rest-dash.component.css']
})
export class RestDashComponent implements OnInit {


  formValue!:FormGroup;
  restaurentModelObj : Restaurent = new Restaurent();
  restaurenData:any;
  showAdd:any;
  showUpdate:any;
  

  constructor(private formBuilder: FormBuilder ,private restapi : RestaurentApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData();
  }

  addRestro(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getAllData(){
    this.restapi.getRestApi().subscribe(res=>{
      this.restaurenData = res;
    })
  }

  addRest(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.restapi.postRestApi(this.restaurentModelObj).subscribe(res=>{
      alert("Restaurent Record Added Successfull ");
      let ref = document.getElementById('colse');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
      
    },
    err=>{
      alert("Something Went Wrong")
    }
    )
  }

  onEdit(data:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  onUpadte(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.restapi.updateRestApi(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurent Record Upadted Successfull");
      let ref = document.getElementById('colse');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })
  }
  deleteData(data:any){
    this.restapi.deleteRestApi(data.id).subscribe(res=>{
      alert("Restaurent Data Deleted");
      this.getAllData();
    })
  }

}
