const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
const cors = require("cors")
require("dotenv").config();
//conenction to database
const connectDB = require("./config/connection");
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');

connectDB();

//allow jason to be parsed
app.use(express.json())
app.use(cookieParser());

//allow static files
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use("/static", express.static(__dirname + "/build/static"))
app.use("/inv_uploads", express.static(__dirname + "/inv_uploads"))

//enable file uploading using express-fileupload
app.use(fileUpload({ createParentPath: true }));

const allowed_origins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://newportal.raichandgroup.com/",
  "https://raichandgroup.com/"
]
//cors
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
//   });

// const corsOptions = {
//     origin: 
//   };
app.use(cors({
  origin: allowed_origins,
  credentials: true
}));

//api routes
app.use("/api/newsletter", require("./routes/newsletter"))
app.use("/api/press-release", require("./routes/press_release"))
app.use("/api/investor-relation", require("./routes/investor_relation"))
app.use("/api/contact-us", require("./routes/contactus"))
app.use("/api/faq", require("./routes/faq"))
app.use("/api/register", require("./routes/register"))
app.use("/api/login", require("./routes/login"))
app.use("/api/create-user", require("./routes/create_user"))
app.use("/api/policies", require("./routes/policies"))
app.use("/api/period", require("./routes/periods"))
app.use("/api/category", require("./routes/category"))
app.use("/api/investor-category", require("./routes/Investor_category"))

//seo
app.use("/api/seo-home", require("./routes/SEO/home"))


const PressRelease = require('./models/press_release');
const investorRelease = require('./models/investor_relation');


app.get("/portal/press-release/:period/:slug", async (req, res) => {
  const { period, slug } = req.params;
  const getPress = await PressRelease.findOne({
    slug, period
  })

  if (!getPress) {
    return res.status(400).json({ message: "File not found" })
  }

  return res.sendFile(path.join(__dirname, `uploads/${getPress.file_name}`))
})


app.get("/portal/investor-relation/:inv_period/:slug", async (req, res) => {
  const { inv_period, slug } = req.params;
  const getPress = await investorRelease.findOne({
    slug, inv_period
  })

  if (!getPress) {
    return res.status(400).json({ message: "File not found" })
  }

  return res.sendFile(path.join(__dirname, `inv_uploads/${getPress.inv_file_name}`))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
})