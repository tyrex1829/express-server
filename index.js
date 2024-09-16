import "dotenv/config";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

// middlewares. If wanna accept some data from the frontend side.
// settings
app.use(express.json()); // any data which comes in json format, we accept that.

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let storeData = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send(
    "<div><h1>Express Data App.</h1> <p>Go to this link to <a href='https://documenter.getpostman.com/view/32508376/2sAXqngjwd' target='_blank'>Read Docs</a></p></div>"
  );
});

// when u wanna save data in db, post data in db etc, use post
app.post("/data", (req, res) => {
  logger.warn("A post request is made to add new data."); // we can use chalk instead.
  const { name, price } = req.body; // to get body of data. (remember data inside body and in json format, when fetched)
  const newData = { id: nextId++, name, price };
  storeData.push(newData);
  res.status(201).send(newData);
});

// get all that posted data to ui.
app.get("/datas", (req, res) => {
  res.status(200).send(storeData);
});

// getting specific data acc to id
app.get("/datas/:id", (req, res) => {
  const oneData = storeData.find((i) => i.id === parseInt(req.params.id)); // i (each obj) ke andar id lo and match karo us id se jo request ki hai(req.params.id)

  if (!oneData) {
    return res.status(404).send("Data not found");
  }
  res.status(200).send(oneData);
});

// update acc to id param
app.put("/datas/:id", (req, res) => {
  const findData = storeData.find((i) => i.id === parseInt(req.params.id));

  if (!findData) {
    return res.status(404).send("Data not found");
  }
  const { name, price } = req.body;
  findData.name = name;
  findData.price = price;
  res.status(200).send(findData);
});

// delete acc to id param
app.delete("/datas/:id", (req, res) => {
  const index = storeData.findIndex((i) => i.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Data not found");
  }
  storeData.splice(index, 1);
  res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
