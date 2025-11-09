import AdminContent from "../models/adminContent.model.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";

export const getAdminContent = async (req, res) => {
  try {
    const content = await AdminContent.findOne().populate([
      "topRestaurants.shopId",
      "trendingFoods.itemId",
      "newDishes.itemId",
    ]);
    if (!content) {
      const newDoc = await AdminContent.create({});
      return res.status(200).json(newDoc);
    }
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ message: `getAdminContent error ${error}` });
  }
};

export const updateAdminContent = async (req, res) => {
  try {
    const updates = req.body;
    const content = await AdminContent.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
    });
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ message: `updateAdminContent error ${error}` });
  }
};
