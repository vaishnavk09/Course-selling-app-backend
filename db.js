const mongoose = require('mongoose')

mongoose.connect(env.MONGO_URI)

const Schema= mongoose.Schema
const ObjectId= Schema.ObjectId

const UserSchema= new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const User = mongoose.model('User',UserSchema)
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports={
    User: User,
    Admin: Admin,
    Course: Course,
    Purchase: Purchase
}