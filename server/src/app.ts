import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/routes";

// importing the express library
const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

// use() method helps to handle the Todos routes
app.use(cors());
app.use(todoRoutes);

// use the mongoose package to connect to MongoDB
// by appending to the URL the credentials held on the nodemon.json file
const uri:string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { userNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
