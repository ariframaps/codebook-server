import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
const cors = require("cors");

const server = express();

// Define CORS options
const corsOptions = {
  // origin: process.env.ORIGIN_URL, // Allow this origin. OWASP top ten
  origin: "*", // Allow this origin. OWASP top ten
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true,
};

server.use(cors(corsOptions)); // Apply CORS middleware with options

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const router = jsonServer.router("./data/db.json");
server.use("/api", router);
server.db = router.db;

const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600,
});

server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(8000);
