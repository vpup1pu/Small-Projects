const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const cors = require('cors');
const authRoutes = require("../lil library/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en: ${PORT}`);
});