import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { TimeSheetService } from "../time-sheet.service";

declare var $:any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    private userSchedules: any;
    private projectList: any;
    private selectProj: any;

    // private user: any;
    private project: any;
    private schedule: any;
    private entry: any;

    @Input() user: any;
    @Input() projectUpdate: any;

    constructor(private us: TimeSheetService, private router:Router) {
        this.init();
    }

    init(){
        // this.user = {
        //     name:"",
        //     errors: {}
        // }
        this.project = {
            name:"",
            desc:"",
            errors: {}
        }
        this.schedule = {
            week:"",
            sunday:0,
            monday:0,
            tuesday:0,
            wednesday:0,
            thursday:0,
            friday:0,
            saturday:0,
            completed: false,
            errors: {}
        }
        this.entry = {
            week: "",
            sunday:0,
            monday:0,
            tuesday:0,
            wednesday:0,
            thursday:0,
            friday:0,
            saturday:0,
            projectId:"",
            errors: {}
        }
    }
    ngOnInit() {
        this.getProjects();
        this.getMatchingSchedules();
    }
    
    getProjects(){
        this.us.allProjects(data=>this.projectList=data);
        // this.projectList.push(data);
    }
    getMatchingSchedules(){
        this.us.allSchedules(data=>this.userSchedules=data);
    }

    projectSelector(project: any){
        this.selectProj = project.target.value;
        if(this.selectProj == "undefined"){
            this.selectProj = this.project;
            this.selectProj.desc = "| - - - - - - - - - |";
        } else {
            for(let i  = 0; i<this.projectList.length; i++){
                if(this.projectList[i]._id == this.selectProj){
                    this.selectProj = this.projectList[i];
                    break;
                }
            } 
        }

        // console.log(this.selectProj.proj);
        // console.log(this.selectProj.name);
        // console.log(this.selectProj.desc);
        // console.log(project.target.value.name);
        // console.log(proj);
        // if(!project){
        //     this.selectProj = undefined;
        // } else {
        //     this.selectProj = project;
        // }
        // let selectedProject = document.getElementById('projectSelect');
        // let selectedProject = document.getElementById('projectSelect');
        // let opt = selectedProject.options[selectedProject.selectedIndex];
        // var opt = testerer.options[testerer.selectedIndex];
        // console.log("Halp");
        // console.log(opt);
        // console.log(this.selectProj);
        // console.log(project);
    }

    onSelectChange(project){
        if(!project){
            this.selectProj = undefined;
        } else {
            this.selectProj = project;
        }
    }

    addWeek(){
        console.log("addWeek Activated");
        this.us.createEntry(this.entry, (data)=>{
            console.log(this.entry);
            // console.log(week);
            if(data.errors){
                this.entry.errors = data.errors;
            }
            // this.entry.push(data);
            this.entry = { 
                week: "",
                sunday:0,
                monday:0,
                tuesday:0,
                wednesday:0,
                thursday:0,
                friday:0,
                saturday:0,
                projectId:"",
                errors:{}
            }
            this.router.navigateByUrl("/");
        });
    }

}
