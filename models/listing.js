const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review= require("./review.js");

const ListingSchema= new Schema({
    title:{ 
        type:String,
        required:true,
    },
    description:String,
    // image:{
    //  type:String,
    //  filename: String,
    //    url: {
    //     default:"https://tse1.mm.bing.net/th/id/OIP.4bVZw62rX340DxNH_qZzAAHaE8?w=5137&h=3425&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     set:(v)=> v === ""? "https://tse1.mm.bing.net/th/id/OIP.4bVZw62rX340DxNH_qZzAAHaE8?w=5137&h=3425&rs=1&pid=ImgDetMain&o=7&rm=3" : v,
    //    }
    //   },
     image: {
    filename: String,
    url: {
      type: String,
      default: "https://tse1.mm.bing.net/th/id/OIP.4bVZw62rX340DxNH_qZzAAHaE8?w=5137&h=3425&rs=1&pid=ImgDetMain&o=7&rm=3",
      set:(v)=> v === ""? "https://tse1.mm.bing.net/th/id/OIP.4bVZw62rX340DxNH_qZzAAHaE8?w=5137&h=3425&rs=1&pid=ImgDetMain&o=7&rm=3" : v,
    }
  },
    price:Number,
    location:String,
    country:String,
    reviews: [
      {
      type: Schema.Types.ObjectId,
      ref: "Review"
      }
    ]
});

ListingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
  await Review.deleteMany({_id: {$in: listing.reviews}});
  };
});

const listing =mongoose.model("listing", ListingSchema);
module.exports= listing;