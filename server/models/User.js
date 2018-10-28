let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Employee Name Required." ],
        minlength: [ 2, "Employee Name Must Be At Least 2 Characters Long."]
    },

    schedule: [{type:ObjectId,ref:"Schedule"}]
    
}, {timestamps: true}));