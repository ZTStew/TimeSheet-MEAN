import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { TimeSheetService } from "./time-sheet.service";

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    private allUsers: any;
    // private allProjects: any;

    private user: any;
    private project: any;
    // private schedule: any;

    constructor(private us: TimeSheetService, private router:Router){
        this.init();
    }

    init(){
        this.user = {
            name:"",
            errors: {}
        }
        this.project = {
            name:"",
            desc:"",
            errors: {}
        }
        // this.schedule = {
        //     week:"",
        //     sunday:"",
        //     monday:"",
        //     tuesday:"",
        //     wednesday:"",
        //     thursday:"",
        //     friday:"",
        //     saturday:"",
        //     completed: false,
        //     errors: {}
        // }
    }

    ngOnInit(){
        console.log("Running...");
        $(document).ready( function () {
            $('#table_id').DataTable();
        } );
        $("p").click(function(){
            console.log("Something Selected");
        });

        this.getAllUsers();
        // this.getAllProjects();
    }

    getAllUsers(){
        this.us.allUsers(data=>this.allUsers=data);
    }
    // getAllProjects(){
    //     this.us.allProjects(data=>this.allProjects=data);
    // }

    createUser(){
        console.log("Here At Create User");
        // console.log(this.user.name);
        this.us.createUser(this.user, (data)=>{
            if(data.errors){
                this.user.errors = data.errors;
            } else {
                this.allUsers.push(data);
                this.user = { name:"", errors:{} }
                this.router.navigateByUrl("/");
            }
        });
    }
    createProject(){
        console.log("Create Project Hit");
        // console.log(this.project);
        this.us.createProject(this.project, (data)=>{
            if(data.errors){
                this.project.errors = data.errors;
            } else {
                this.projectList.push(data);
                this.project = { name:"", desc:"", errors: {} }
                this.router.navigateByUrl("/");
            }
        })
    }
}

