import { Express } from "express";
import { LoanRoutes } from "./loan.routes";

export const appRoutes = (app: Express) => {
  app.use("/api", LoanRoutes());
};
