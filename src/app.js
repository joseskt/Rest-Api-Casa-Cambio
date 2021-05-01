//Configuracion
import express from "express";
import morgan from "morgan";
import cors from "cors";
import OrdersRoutes from "./routes/Orders.routes";

const app = express();

// Configuracion
app.set("port", process.env.PORT || 3002);

//Middlewares
const corsOptions = {};
app.use(cors({ corsOptions }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Application" });
});

app.use("/api/accounts", OrdersRoutes);

export default app;
