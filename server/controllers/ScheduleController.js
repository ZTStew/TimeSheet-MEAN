let User = require("mongoose").model("User");
let Project = require("mongoose").model("Project");
let Schedule = require("mongoose").model("Schedule");
let Entry = require("mongoose").model("Entry");

class ScheduleController {
    all(req, res){
        console.log("Find All Schedules Hit");
        Schedule.find({}, function(err, schedules){
            if(!schedules){
                return res.json(err);
            }
            return res.json(schedules);
        });
    }
    create(req, res){
        console.log("Create Schedule Hit");
        // console.log(req.body);
        // console.log(req.params.user_id);
        let schedule = new Schedule(req.body);

        schedule.save(function(err){    
            if(err){
                return res.json(err);
            }
            User.findById(req.params.user_id, (err, user)=>{
                if(!user){
                    return res.json(err);
                }
                console.log(user);
                user.schedule.push(schedule.id);
                schedule.user = user.id;
                user.save(err=>{
                    if(err){
                        return res.json(err);
                    }
                    return res.json(schedule);
                });
            });
        });
    }
    findById(req, res){
        console.log("Find Schedule By Id Hit");
        Schedule.findOne({_id:req.params.id}, (err, schedule)=>{
            if(!schedule){
                return res.json(err);
            }
            return res.json(schedule);
        });
    }
    findByWeek(req, res){
        console.log("Find By Week Hit");
    }
    update(req, res){
        console.log("Update Schedule Hit");
        Schedule.findOne({_id:req.params.id}, (err, schedule)=>{
            if(!schedule){
                return res.json(err);
            }
            schedule.week = req.body.week || schedule.week;
            // schedule.sunday = req.body.sunday || schedule.sunday;
            // schedule.monday = req.body.monday || schedule.monday;
            // schedule.tuesday = req.body.tuesday || schedule.tuesday;
            // schedule.wednesday = req.body.wednesday || schedule.wednesday;
            // schedule.thursday = req.body.thursday || schedule.thursday;
            // schedule.friday = req.body.friday || schedule.friday;
            // schedule.saturday = req.body.saturday || schedule.saturday;
            schedule.completed = req.body.completed || schedule.completed;
            schedule.save(err=>{
                if(err){
                    return res.json(err);
                }
                return res.json(schedule);
            });
        });
    }
    remove(req, res){
        console.log("Delete Schedule Hit");
        Schedule.findOne({_id:req.params.id}, (err, schedule)=>{
            if(!schedule){
                return res.json(err);
            }
            Schedule.remove({_id:req.params.id}, (err)=>{
                if(err){
                    return res.json(err);
                }
                return res.json(schedule);
            });
        });
    }

}

module.exports = new ScheduleController();