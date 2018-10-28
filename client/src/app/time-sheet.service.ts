import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(private http:HttpClient) { }

  allUsers(cb){
    console.log("All Users Request Hit")
    this.http.get("/api/users/all")
    .subscribe(data=>cb(data));
  }
  allProjects(cb){
    this.http.get("/api/project/all")
    .subscribe(data=>cb(data));
  }
  allSchedules(cb){
    console.log("All Schedules Hit");
    this.http.get("/api/schedule/all")
    .subscribe(data=>cb(data));
  }

  createUser(user, cb){
      // console.log("Create User Hit");
      // console.log(user);
      this.http.post("/api/users/create", user)
      .subscribe(data=>cb(data));
  }
  createProject(project, cb){
      console.log("Create Project Hit (time-sheet.service.ts)");
      this.http.post("/api/project/create", project)
      .subscribe(data=>cb(data));
  }
  createEntry(entry, cb){
    console.log("Create Entry Hit");
    console.log(entry);
  }

}
