const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "news-task";


mongoClient.connect(
    connectionUrl,
    { useNewUrlParser: true },
    (error, news) => {
      if (error) {
        return console.log("error has occured");
      }
      console.log("success");
      const db = news.db(dbName)}
      )