//Configuracion
import express from "express";
import morgan from "morgan";
import cors from "cors";
import OrdersRoutes from "./routes/Orders.routes";
import authRoutes from "./routes/auth.routes";
import { createRoles } from "./libs/initalSetup";
import pkg from "../package.json";
import userRoutes from "./routes/user.routes";

const app = express();
createRoles();
app.set("pkg", pkg);

// Configuracion
app.set("port", process.env.PORT || 4000);

//Middlewares
const corsOptions = {};
app.use(cors({ corsOptions }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/accounts", OrdersRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

export default app;