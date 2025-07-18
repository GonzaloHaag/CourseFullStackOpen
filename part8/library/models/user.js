import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:false
    },
    favoriteGenre: {
        type:String
    }
})
export const User = mongoose.model('User',schema)