import mongoose from "mongoose";

const adminContentSchema = new mongoose.Schema({
  topRestaurants: [
    {
      shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
      priority: Number,
    },
  ],
  trendingFoods: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      priority: Number,
    },
  ],
  newDishes: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  testimonials: [
    {
      name: String,
      city: String,
      message: String,
      rating: Number,
      image: String,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminContent = mongoose.model("AdminContent", adminContentSchema);
export default AdminContent;
