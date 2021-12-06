import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;


  constructor(private formBuilder:FormBuilder,private _http : HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      password:['']
    })
  }

  // make method to create user
  signUp(){
    this._http.post<any>('http://localhost:3000/signup',this.signUpForm.value).subscribe(res=>{
      alert("Registration successfully");
      this.signUpForm.reset();
      this.router.navigate(['login']);
    },
    err=>{
      alert("Something went wrong")
    }
    )
  }

}
