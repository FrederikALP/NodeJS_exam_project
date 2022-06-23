import mongoose from "mongoose";
import Forum from "../schema/forum.js";
import SubForum from "../schema/subForum.js";
import Posts from "../schema/posts.js";
import Comments from "../schema/comments.js";
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
    mainid: 1,
    _id: 1
},
{
    subheader: 'another sub brand',
    postcount: 0,
    commentcount: 0,
    mainid: 1,
    _id: 2
},
{
    subheader: 'hearing aids reviews',
    postcount: 0,
    commentcount: 0,
    mainid: 2,
    _id: 3
},
{
    subheader: 'hyperX',
    postcount: 0,
    commentcount: 0,
    mainid: 3,
    _id: 4
}
]

const seedPosts = [
    {
        postheader: 'testing posts',
        postbody: "test strign",
        replycount: 0,
        subid: 1,
        user: {
            username: "Kristian",
            userid: "62b318932f4dcd817799a245"
        }
    }
]

const seedDB = async () => {
    await Forum.deleteMany({});
    await Forum.insertMany(seedForum);
    await SubForum.deleteMany({});
    await SubForum.insertMany(seedSubForum);
    await Posts.deleteMany({});
    await Posts.insertMany(seedPosts);
};

seedDB().then(() => {
    mongoose.connection.close();
})