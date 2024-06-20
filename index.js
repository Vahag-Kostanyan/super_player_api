import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.json({ status: 200, message: 'Server working' }); });

app.listen(process.env.PORT || 5000, () => console.log("Server is listening on port 5000"));