import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  
  isLogin:boolean=false;
  submitted = false;
  employeeLogin:FormGroup
  Employee:any = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
    ) { 
      this.loginForm();
    // this.readEmployee();
  }

  ngOnInit() {}

  loginForm(){
    this.employeeLogin= this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.employeeLogin.controls;
  }

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.employeeLogin.valid) {
      return false;
    } else {
      this.apiService.signIn(this.employeeLogin.value).subscribe(
        (res) => {
          if(res.status!=200){
            alert("Invalid Username/Password");
          }
          else if(res.status==200){
            this.isLogin=true;
            this.readEmployee();
          }
          
        }, (error) => {
          console.log(error);
        });
    }
  }

}