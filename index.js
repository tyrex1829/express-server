import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World, This is a landing page of our backend server");
});

app.get("/about", (req, res) => {
  res.send("Hello World, This is a about-us page of our backend server");
});

app.get("/contact", (req, res) => {
  res.send("Hello World, This is a contact-us page of our backend server");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
