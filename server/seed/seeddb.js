import mongoose from "mongoose";
import Forum from "../schema/forum.js";
import SubForum from "../schema/subForum.js";
import dotenv from "dotenv"
dotenv.config();

mongoose.connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@hearingimpairedforum.arjmn.mongodb.net/HearingImpaired?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('Error', console.log.bind(console, "DB connection error"));
db.once('open', function(callback) {
    console.log("DB connection established");
});

const seedForum = [
{
   mainheader: 'hearing aids',
   _id: 1
},
{
    mainheader: 'reviews',
    _id: 2
 },
 {
    mainheader: 'headphones for hearing aids',
    _id: 3
 }
];

const seedSubForum = [
{
    subheader: 'some brand bose',
    postcount: 0,
    commentcount: 0,
    mainid: 1
},
{
    subheader: 'hearing aids reviews',
    postcount: 0,
    commentcount: 0,
    mainid: 2
},
{
    subheader: 'hyperX',
    postcount: 0,
    commentcount: 0,
    mainid: 3
},
]

const seedDB = async () => {
    await Forum.deleteMany({});
    await Forum.insertMany(seedForum);
    await SubForum.deleteMany({});
    await SubForum.insertMany(seedSubForum);
};

seedDB().then(() => {
    mongoose.connection.close();
})