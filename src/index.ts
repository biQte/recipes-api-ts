import express, { json } from "express";
import { AppDataSource } from "./data-source";
import apiRouter from "./routes/router";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

AppDataSource.initialize()
  .then(async () => {
    const { PORT } = process.env;
    const app = express();

    app.use(json());
    app.use("/api", apiRouter);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(
      "/images",
      express.static("/Users/patryk/Desktop/recipe-app/images")
    );

    app
      .listen(PORT, () => {
        console.log("Hello!");
      })
      .on("error", (error) => {
        console.error(error);
      });
  })
  .catch((error) => console.log(error));
