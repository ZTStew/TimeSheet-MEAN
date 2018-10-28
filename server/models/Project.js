let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

mongoose.model("Project", new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Project Name Required." ],
        minlength: [ 2, "Project Name Must Be At Least 2 Characters Long."]
    },
    desc: {
        type: String,
        required: [ true, "Description Required." ],
        minlength: [ 2, "Description Must Be At Least 5 Characters Long."]
    },

    entry: [{type:ObjectId,ref:"Entry"}]
}, {timestamps: true}));