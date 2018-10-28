let User = require("mongoose").model("User");

class UserController {
    all(req, res){
        console.log("Find All Users Hit");
        User.find({}, function(err, users){
            if(!users){
                return res.json(err);
            }
            return res.json(users);
        });
    }
    create(req, res){
        console.log("Create User Hit");
        console.log(req.body);
        let user = new User(req.body);
        // console.log(user);
        user.save(function(err){
            if(err){
                return res.json(err);
            }
            return res.json(user)
        });
    }
    findByName(req, res){
        console.log("Find User By Name Hit");
        console.log(req.params.name);
        User.findOne({name:req.params.name}, (err, user)=>{
            if(!user){
                return res.json(err);
            }
            return res.json(user);
        });
    }
    findById(req, res){
        console.log("Find User By Id Hit");
        User.findOne({_id:req.params.id}, (err, user)=>{
            if(!user){
                return res.json(err);
            }
            return res.json(user);
        });
    }
    update(req, res){
        console.log("Update User Hit");
        User.findOne({_id:req.params.id}, (err, user)=>{
            if(!user){
                return res.json(err);
            }
            user.name = req.body.name || user.name;
            user.save(err=>{
                if(err){
                    return res.json(err);
                }
                return res.json(user);
            })
        });
    }
    remove(req, res){
        console.log("Delete User Hit");
        User.findOne({_id:req.params.id}, (err, user)=>{
            if(!user){
                return res.json(err);
            }
            User.remove({_id:req.params.id}, (err)=>{
                if(err){
                    return res.json(err);
                }
                return res.json(user);
            });
        });
    }
}

module.exports = new UserController();
