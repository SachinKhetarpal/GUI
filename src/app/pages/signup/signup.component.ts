import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, 
     private _snackBar: MatSnackBar) { }

public user = 
{
    mobile: '',
    username: '',
    password: '',
    fullName: '',
    email: ''
};


  ngOnInit(): void {
  }
  formSubmit()
  {
    if(this.user.username==null || this.user.username==''){
      this._snackBar.open("Mobile num is required!","OK",{
        duration:5000,
        verticalPosition:'top',
        horizontalPosition:'right'
      })
     
      return;
    }
    if(this.user.fullName==null || this.user.fullName==''){
      this._snackBar.open("Name is required!","OK",{
        duration:5000,
        verticalPosition:'top',
        horizontalPosition:'right'
      })
     
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire('Username = '+data.mobile,data.fullName+' is registered successfully!','success');
        this._snackBar.open('Sucessfully Saved!','',{
          duration:5000,
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      },
      (error)=>{
        console.log(error);
        this._snackBar.open('Something went wrong','',{
          duration:5000,
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      }
    );
  }

}
