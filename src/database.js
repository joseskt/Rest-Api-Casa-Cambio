import mongoose from "mongoose";
import config from "./config";

(async () => {
  try {
    const db = await mongoose.connect(config.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("Database is Connected:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();