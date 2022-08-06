import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { StudentService } from 'src/app/student.service';
import { ModeratorModel } from 'src/app/Model/moderator.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-batch-manager',
  templateUrl: './batch-manager.component.html',
  styleUrls: ['./batch-manager.component.css']
})
export class BatchManagerComponent implements OnInit {
  id=""
  new:any
  displayStyle = "none";
  moderatorData:ModeratorModel[] | any
  data:any= new ModeratorModel("","","","","") 
  array:any
  courses:any
  designations=["Manager","Assistant Manager","Course Manager"]
  p : number = 1;
  constructor(private _actiroute:ActivatedRoute,private admin:AdminService,private _student:StudentService, private toastr: ToastrService , private router:Router) { }
  

  ngOnInit(): void {

    this.id = this._actiroute.snapshot.params['id'];
    this.admin.fetchModerator(this.id).subscribe((moddata) => {
      this.moderatorData = JSON.parse(JSON.stringify(moddata))
    })
    
  }
  update(id:any){
    localStorage.setItem("BM-ID",id)
    let url = localStorage.getItem("url")
    this.router.navigate([`${url}/editmanager`])
  }

  delete(id:any){
    console.log(id)
    this.admin.deleteMod(id).subscribe(()=>{
    console.log("DELETED")
    })
    window.location.reload()

  }
  view(){
    this.displayStyle = "block";
    this._student.getCourses().subscribe((data)=>{
    this.array = JSON.parse(JSON.stringify(data))
    this.courses = this.array[0].course
    })

  }
  closeview(){
    this.displayStyle = "none";
  }

  Register(){
    this.admin.addmanager(this.data).subscribe((data)=>{
      this.new = JSON.parse(JSON.stringify(data))
      if(this.new.length == 0){
        window.location.reload()
        this.toastr.success("Added")
      }
      else{
        this.toastr.error("Failed")
      }
    })

  }


}
