import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { appRoutes } from "./routes";
import { errorHandler } from "./errors/errorHandler";

const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

appRoutes(app);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
