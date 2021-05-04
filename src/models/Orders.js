import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ordenesSchema = new Schema(
  {
    Id: Schema.Types.ObjectId,
    precio: {
      type: Number,
      trim: true,
      default: 0,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    cuenta: {
      type: Number,
      required: true,
      trim: true,
    },
    banco: String,
    documento: String,
    CI: {
      type: Number,
      required: true,
      trim: true,
    },
    img: {
      data: Buffer,
      contenType: String,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ordenesSchema.plugin(mongoosePaginate);
export default model("Cuentas", ordenesSchema);