const mongoose = require("mongoose");

//! change
const db =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : "mongodb+srv://stepan:stepan123@cluster0.wsbgb.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
