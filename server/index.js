import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/artwork.route.js";
import cors from "cors";

dotenv.config({ quiet: true });

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
