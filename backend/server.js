const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();
require("./models/config");
const app = express();


app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
