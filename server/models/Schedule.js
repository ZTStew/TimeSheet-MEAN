let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

mongoose.model("Schedule", new mongoose.Schema({
    week: {
        type: Date,
        required: [ true, "Week Is Required" ],
    },
    completed: {
        type: Boolean,
        default: false,
    },

    user: {type:ObjectId,ref:"User"},
    // project: [{type:ObjectId,ref:"Project"}],
    entry: [{type:ObjectId,ref:"Entry"}],
}, {timestamps: true}));
