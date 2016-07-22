var mongoose        = require( 'mongoose' ),
    DatasetSchema   = new mongoose.Schema({
        formats         : {
            type        : [ String ],
            required    : true
        },
        link            : {
            type        : String,
            required    : true
        },
        organization    : {
            type        : String,
            required    : true
        },
        title           : {
            type        : String,
            required    : true
        },
        type            : {
            type        : String,
            required    : true
        }
    });

module.exports  = mongoose.model( 'Dataset', DatasetSchema );