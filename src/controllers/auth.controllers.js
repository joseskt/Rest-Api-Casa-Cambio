import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import configUser from "../configUser";

//Signup
export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (req.body.roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "User" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();
  console.log(savedUser);
  //Token
  const token = jwt.sign({ id: savedUser._id }, configUser.SECRET, {
    expiresIn: 43200, // 12 horas
  });

  res.json({ token });
};
// Signin
export const signin = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!userFound) return res.status(400).json({ message: "Usuario no Valido" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ token: null, message: "Contraseña Incorrecta" });
  //Token
  const token = jwt.sign({ id: userFound._id }, configUser.SECRET, {
    expiresIn: 43200, //12 horas
  });

  res.json({ token });
};