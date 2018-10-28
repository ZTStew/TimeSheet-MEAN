let UserController = require("../controllers/UserController.js");
let ProjectController = require("../controllers/ProjectController.js");
let ScheduleController = require("../controllers/ScheduleController.js");
let EntryController = require("../controllers/EntryController.js");
let path = require("path");

module.exports = function(app){
    /*UserController*/
    app.get("/api/users/all", UserController.all);
    app.post("/api/users/create", UserController.create);
    app.get("/api/users/select/:name", UserController.findByName);
    app.get("/api/users/selectId/:id", UserController.findById);
    app.patch("/api/users/update/:id", UserController.update);
    app.delete("/api/users/remove/:id", UserController.remove);

    /*ProjectController*/
    app.get("/api/project/all", ProjectController.all);
    app.post("/api/project/create", ProjectController.create);
    app.get("/api/project/select/:project", ProjectController.findByName);
    app.get("/api/project/select/:id", ProjectController.findById);
    app.patch("/api/project/update/:id", ProjectController.update);
    app.delete("/api/project/remove/:id", ProjectController.remove);

    /*ScheduleController*/
    app.get("/api/schedule/all", ScheduleController.all);
    app.post("/api/schedule/create/:user_id", ScheduleController.create);
    // app.get("/api/schedule/select/:id", ScheduleController.findById);
    app.get("/api/schedule/select/:user_id/:week", ScheduleController.findByWeek);
    app.put("/api/schedule/update/:id", ScheduleController.update);
    app.delete("/api/schedule/remove/:id", ScheduleController.remove);

    /*EntryController*/
    app.get("/api/entry/all", EntryController.all);
    app.post("/api/entry/create/:schedule_id/:project_id", EntryController.create);
    app.get("/api/entry/select/:id", EntryController.findById);
    app.put("/api/entry/update/:id", EntryController.update);
    app.delete("/api/entry/remove/:id", EntryController.remove);

    app.all("*", (req, res, next) => {                                          // catch all that sends route to angular
        res.sendFile(path.resolve("./client/dist/client/index.html"));          // tells app where to route browser for catch-all data
    });
}
