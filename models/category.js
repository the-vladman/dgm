var mongoose        = require( 'mongoose' ),
    CategorySchema  = new mongoose.Schema({
        name            : {
            type        : String,
            required    : true
        },
        section         : {
            type        : mongoose.Schema.Types.ObjectId,
            ref         : 'Category',
            required    : false
        },
        slug            : {
            type        : String,
            required    : true
        },
        type            : {
            type        : String,
            required    : true
        }
    });

module.exports  = mongoose.model( 'Category', CategorySchema );