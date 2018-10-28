let Project = require("mongoose").model("Project");
let Schedule = require("mongoose").model("Schedule");
let Entry = require("mongoose").model("Entry");

class EntryController {

    all(req, res){
        console.log("Find All Entries Hit");
        Entry.find({}, function(err, entries){
            if(!entries){
                return res.json(err);
            }
            return res.json(entries);
        });
    }
    create(req, res){
        // console.log("Create Entry Hit");
        // console.log(req.body);
        // console.log(req.params.schedule_id);
        // console.log(req.params.project_id);
        let entry = new Entry(req.body);
        // console.log(entry);
        entry.save(function(err){
            if(err){
                return res.json(err);
            }
            // console.log(entry.project);
            // Project.find({_id:entry.project}, (err, projectO)=>{
            //     if(!projectO){
            //         return res.json(err);
            //     }
            //     console.log("Found Project");
            //     console.log(projectO);
            // })

            // return res.json(entry);

            Schedule.findOne({_id:req.params.schedule_id}, (err, schedule)=>{
                if(err){
                    // entry.Delete();
                    return res.json(err);
                }
                if(!schedule){
                    // console.log(err);
                    // console.log(schedule);
                    return res.json({ message: "Schedule Not Found"} )
                }
                // console.log("Matching Schedule Found");
                // console.log("Schedule Test");
                // console.log(schedule);
                // console.log(schedule["entry"]);
                // console.log(schedule.user);
                // console.log("Entry");
                // console.log(entry.id);
                // console.log(entry);
                // console.log("Entry-Schedule", entry.schedule);

                schedule.entry.push(entry.id);
                entry.schedule = schedule.id;
                // console.log(schedule["entry"]);

                // console.log(entry);
                // console.log("MADE IT THROUGH PUSH!");

                // console.log("Project Id", req.params.project_id);

                Project.findOne({_id:req.params.project_id}, (err, project)=>{
                    if(!schedule){
                        return res.json(err);
                    }
                    // console.log("Matching Project Found");
                    // console.log(entry);
                    // console.log(project);
                    project.entry.push(entry.id);
                    entry.project = project.id;
                    // console.log(entry);
                    // console.log("Entry List", project.entry);
                    // console.log("Project", entry.project);
                    schedule.save(err=>{
                        if(err){
                            return res.json(err);
                        }
                        project.save(err=>{
                            if(err){
                                return res.json(err);
                            }
                            entry.save(err=>{
                                if(err){
                                    return res.json(err);
                                }
                                return res.json(entry);
                            });
                        });
                    });
                })
            });
        });
    }
    findById(req, res){
        console.log("Find Entry By Id Hit");
        Entry.findOne({_id:req.params.id}, (err, entry)=>{
            if(!entry){
                return res.json(err);
            }
            return res.json(entry);
        });
    }
    update(req, res){
        console.log("Update Entry Hit");
        Entry.findOne({_id:req.params.id}, (err, entry)=>{
            if(!entry){
                return res.json(err);
            }
            // entry.week = req.body.week || entry.week;
            entry.sunday = req.body.sunday || entry.sunday;
            entry.monday = req.body.monday || entry.monday;
            entry.tuesday = req.body.tuesday || entry.tuesday;
            entry.wednesday = req.body.wednesday || entry.wednesday;
            entry.thursday = req.body.thursday || entry.thursday;
            entry.friday = req.body.friday || entry.friday;
            entry.saturday = req.body.saturday || entry.saturday;
            // entry.completed = req.body.completed || entry.completed;
            entry.save(err=>{
                if(err){
                    return res.json(err);
                }
                return res.json(entry);
            });
        });
    }
    remove(req, res){
        console.log("Delete Entry Hit");
        Entry.findOne({_id:req.params.id}, (err, entry)=>{
            if(!entry){
                return res.json(err);
            }
            Entry.remove({_id:req.params.id}, (err)=>{
                if(err){
                    return res.json(err);
                }
                return res.json(entry);
            });
        });
    }
}

module.exports = new EntryController();