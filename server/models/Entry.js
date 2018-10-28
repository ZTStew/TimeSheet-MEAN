let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

mongoose.model("Entry", new mongoose.Schema({

    sunday: { type: Number, required: [ true, "Must Enter A Value" ], default: 0, min: [ 0, "Minimum Hours Worked Must Be 0." ], max: [ 24, "Maximum Hours Worked Must Be 24." ] },
    monday: { type: Number, required: [ true, "Must Enter A Value" ], default: 0, min: [ 0, "Minimum Hours Worked Must Be 0." ], max: [ 24, "Maximum Hours Worked Must Be 24." ] },
    tuesday: { type: Number, required: [ true, "Must Enter A Value" ], default: 0, min: [ 0, "Minimum Hours Worked Must Be 0." ], max: [ 24, "Maximum Hours Worked Must Be 24." ] },
    wednesday: { type: Number, required: [ true, "Must Enter A Value" ], default: 0, min: [ 0, "Minimum Hours Worked Must Be 0." ], max: [ 24, "Maximum Hours Worked Must Be 24." ] },
    thursday: { type: Number, required: [ true, "Must Enter A Value" ], default: 0, min: [ 0, "Minimum Hours Worked Must Be 0." ], max: [ 24, "Maximum Hours Worked Must Be 24." ] },
    friday: { type: Number, required: [ true, "Must Enter A Value" ], default: 0, min: [ 0, "Minimum Hours Worked Must Be 0." ], max: [ 24, "Maximum Hours Worked Must Be 24." ] },
    saturday: { type: Number, required: [ true, "Must Enter A Value" ], default: 0, min: [ 0, "Minimum Hours Worked Must Be 0." ], max: [ 24, "Maximum Hours Worked Must Be 24." ] },

    project: {type:ObjectId,ref:"Project"},
    schedule: {type:ObjectId,ref:"Schedule"}

}, {timestamps: true}));
