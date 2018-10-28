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
    private temp: any;

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

    onSelectChange(project){
        if(!project){
            this.temp = undefined;
        } else {
            this.temp = project;
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
