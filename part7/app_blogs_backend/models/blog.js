const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments : [String] // array de strings
});

/** Transformar la data que quiero que sea devuelta en json */
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
            delete returnedObject._id // no quiero el id
        delete returnedObject.__v // no quiero el campo __v
    }
})

module.exports = mongoose.model('Blog', blogSchema)