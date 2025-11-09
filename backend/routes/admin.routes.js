import express from "express";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  getAdminContent,
  updateAdminContent,
} from "../controllers/admin.controllers.js";

const adminRouter = express.Router();

adminRouter.get("/content", isAuth, isAdmin, getAdminContent);
adminRouter.put("/content", isAuth, isAdmin, updateAdminContent);

export default adminRouter;
