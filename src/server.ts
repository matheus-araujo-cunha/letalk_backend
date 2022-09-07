import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => console.error(err));
  const port = process.env.PORT ?? 3000;

  app.listen(port, () => console.log(`App running on port ${port}`));
})();
