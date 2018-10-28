let Project = require("mongoose").model("Project");

class ProjectController{
    all(req, res){
        // console.log("Find All Projects Hit");
        Project.find({}, function(err, projects){
            if(!projects){
                return res.json(err);
            }
            return res.json(projects);
        });
    }
    create(req, res){
        console.log("Create Project Hit");
        let project = new Project(req.body);
        project.save(function(err){
            if(err){
                return res.json(err);
            }
            return res.json(project);
        })
    }
    findByName(req, res){
        console.log("Find By Project Name Hit");
        Project.findOne({name:req.params.name}, (err, project)=>{
            if(!project){
                return res.json(err);
            }
            return res.json(project);
        });
    }
    findById(req, res){
        console.log("Find By Project Id Hit");
        Project.findOne({_id:req.params.name}, (err, project)=>{
            if(!project){
                return res.json(err);
            }
            return res.json(project);
        });
    }
    update(req, res){
        console.log("Update Project Hit");
        Project.findOne({_id:req.params.id}, (err, project)=>{
            if(!project){
                return res.json(err);
            }
            project.name = req.body.name || project.name;
            project.desc = req.body.desc || project.desc;

            project.save(err=>{
                if(err){
                    return res.json(err);
                }
                return res.json(project);
            });
        });
    }
    remove(req, res){
        console.log("Delete Project Hit");
        Project.findOne({_id:req.params.id}, (err, project)=>{
            if(!project){
                return res.json(err);
            }
            Project.remove({_id:req.params.id}, (err)=>{
                if(err){
                    return res.json(err);
                }
                return res.json(project);
            });
        });
    }
}

module.exports = new ProjectController();
