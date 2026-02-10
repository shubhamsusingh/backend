import "reflect-metadata"; 
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import routes from "./routes";


dotenv.config();

const app = express();

// middleware
app.use(express.json());
// app.get("/ping", (_req, res) => {
//   res.send("PING OK");
// });

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   console.log('Request body:', req.body);
//   next();
// });
// test route
app.use("/api", routes);

app.get("/", (_req: Request, res: Response) => {
  res.send("API running");
});

const PORT: number = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
