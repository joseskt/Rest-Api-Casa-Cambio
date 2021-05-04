import { Schema, model } from "mongoose";

export const ROLES = ["User", "Admin", "Gestor"]

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);