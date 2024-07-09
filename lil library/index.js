const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const authRoutes = require("../lil library/routes/authRoutes");
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);

const cors = require('cors');
app.use(cors());

app.listen(PORT, ()=>{console.log(`Servidor escuchando en: ${PORT}`);});