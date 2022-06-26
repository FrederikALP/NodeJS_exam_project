import mongoose from "mongoose";
import Forum from "../schema/forum.js";
import SubForum from "../schema/subForum.js";
import Posts from "../schema/posts.js";
import Comments from "../schema/comments.js";
import Users from "../schema/user.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@hearingimpairedforum.arjmn.mongodb.net/HearingImpaired?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('Error', console.log.bind(console, "DB connection error"));
db.once('open', function(callback) {
    console.log("DB connection established");
});

const seedForum = [
{
   mainheader: 'Hearing Aids',
   _id: 1
},
{
    mainheader: 'Events',
    _id: 2
 },
 {
    mainheader: 'Headsets',
    _id: 3
 },
 {
    mainheader: 'Reviews',
    _id: 4
 },
 {
    mainheader: 'News',
    _id: 5
 }
];

const seedSubForum = [
{
    subheader: 'Brands',
    postcount: 0,
    commentcount: 0,
    mainid: 1,
    _id: 1
},
{
    subheader: 'Help and Support',
    postcount: 0,
    commentcount: 0,
    mainid: 1,
    _id: 2
},
{
    subheader: 'Conventions',
    postcount: 0,
    commentcount: 0,
    mainid: 2,
    _id: 3
},
{
    subheader: 'Local Meets',
    postcount: 0,
    commentcount: 0,
    mainid: 2,
    _id: 4
},
{
    subheader: 'Brands',
    postcount: 0,
    commentcount: 0,
    mainid: 3,
    _id: 5
},
{
    subheader: 'General Discussion',
    postcount: 0,
    commentcount: 0,
    mainid: 3,
    _id: 6
},
{
    subheader: 'Hearing Aids Reviews',
    postcount: 0,
    commentcount: 0,
    mainid: 4,
    _id: 7
},
{
    subheader: 'Headsets Reviews',
    postcount: 0,
    commentcount: 0,
    mainid: 4,
    _id: 8
},
{
    subheader: 'Product News',
    postcount: 0,
    commentcount: 0,
    mainid: 5,
    _id: 9
},
{
    subheader: 'Research News',
    postcount: 0,
    commentcount: 0,
    mainid: 5,
    _id: 10
}
]

const seedPosts = [
    {
        postheader: 'testing posts',
        postbody: "test strign",
        replycount: 0,
        subid: 1,
        userid: "62b318932f4dcd817799a245"
    
    }
]

const seedComments = [
    {
        commentbody: 'Sounds great!',
        replynumber: 0,
        postid: '62b45f5552c6a59897d5d7c2',
        userid: "62b318932f4dcd817799a245"

    }
]

const seedDB = async () => {
    await Forum.deleteMany({});
    await Forum.insertMany(seedForum);
    await SubForum.deleteMany({});
    await SubForum.insertMany(seedSubForum);
    await Posts.deleteMany({});
    //await Posts.insertMany(seedPosts);
    await Comments.deleteMany({});
    //await Comments.insertMany(seedComments);
    await Users.deleteMany({});
    //await Users.insertMany(seedComments);
};

seedDB().then(() => {
    mongoose.connection.close();
})