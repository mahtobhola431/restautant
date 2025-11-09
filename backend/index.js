import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
import orderRouter from "./routes/order.routes.js";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";
import adminRouter from "./routes/admin.routes.js";

// ---------------- Initialize ----------------
const app = express();
const server = http.createServer(app);

app.set("trust proxy", 1);

// ---------------- Allowed Origins ----------------
const allowedOrigins = [
  "http://localhost:5173",               // Local frontend
  "https://nyvex-restro-app.vercel.app"  // Deployed frontend
];

// ---------------- Socket.IO ----------------
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
app.set("io", io);

// ---------------- Middleware Setup ----------------
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from allowedOrigins or Postman (no origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Required for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// ---------------- Routes ----------------
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

socketHandler(io);


app.get("/", (req, res) => {
  res.send("🍽️ Restaurant Backend API is running successfully!");
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  connectDb();
  console.log(`✅ Server started on port ${port}`);
});
