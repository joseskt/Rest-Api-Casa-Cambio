import jwt from "jsonwebtoken";
import configUser from "../configUser";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "Token no Definido" });

    const decoded = jwt.verify(token, configUser.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: "El usuario no Existe" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "No esta autorizado" });
  }
};

export const isGestor = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "Gestor") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Requiere el rol de Gestor" });
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "Admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Requiere el rol de Admin" });
};