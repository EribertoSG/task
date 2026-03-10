import express from "express";
import router from "./router/route.ts";
import morgan from "morgan";
import "./config/psql.ts";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(router);

const PORT = Number(process.env.PORT ?? 8080);

app.listen(PORT, () => {
  console.log(`Running on port: http://localhost:${PORT}`);
});
