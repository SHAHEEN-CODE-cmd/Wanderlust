const mongoose=require("mongoose");
const initData=require("./data.js").data;
const Listing =require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{console.log(err)});

async function main(){
    await mongoose.connect(MONGO_URL);
}

// const initDB = async() => {
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData);
//     initData.forEach((item, index) => {
//     if (!item.title) {
//         console.log(`Missing title in item at index ${index}:`, item);
//     }
// });

//     console.log("data was initialized");
// };

const initDB = async () => {
    await Listing.deleteMany({});
    // initData.data=initData.data.map((obj)=>({...obj, owner:'68add5027fc849e0edcf07ac',}))
    await Listing.insertMany(initData.data);

    console.log("data was initialized");
};


initDB();