import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username:'',
    password:''
  }
  constructor(private snack: MatSnackBar, private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Login attempt:");
    if(this.loginData.username == ''|| this.loginData.username==null)
    {
        this.snack.open("Mobile Num is required !!",'',{
          duration:3000,
        });
        return;
    }
    if(this.loginData.password.trim()==''|| this.loginData.password==null)
    {
        this.snack.open("Password is required !!",'',{
          duration:3000,
        });
        return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);
        //login..
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect to respective dashboard
           if(this.login.getUserRole()=="ADMIN")
           {
            this.router.navigate(['admin-dashboard']);
           }
           else if(this.login.getUserRole()=="NORMAL")
           {
            this.router.navigate(['user-dashboard']);
           }
           else{
            this.login.logout();
           }
            
          }
        );
      },
      (error:any)=>{
        console.log('Error!');
        console.log(error);
        this.snack.open('Invalid Details !! Try again','',{
          duration: 3000
        })
      }
    );
  }
}
