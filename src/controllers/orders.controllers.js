import Orders from "../models/Orders";
import { getPagination } from "../libs/getPagination";

export const getOrders = async (req, res) => {
  try {
    const { size, page } = req.query;

    const { limit, offset } = getPagination(page, size);

    const orders = await Orders.paginate({}, { offset, limit });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Algo acaba de salir mal con la Orden",
    });
  }
};

export const createOrders = async (req, res) => {
  try {
    const newOrders = new Orders({
      precio: req.body.precio,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      cuenta: req.body.cuenta,
      banco: req.body.banco,
      documento: req.body.documento,
      CI: req.body.CI,
      img: req.body.img,
      done: req.body.done ? req.body.done : false,
    });
    const ordersSaved = await newOrders.save();
    res.json(ordersSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error al crear la Orden",
    });
  }
};

export const findAllDoneOrders = async (req, res) => {
  const orders = await Orders.find({ done: true });
  res.json(orders);
};

export const findOneOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.findById(id);

    if (!order)
      return res.status(404).json({ message: `Orden ${id} No Existe` });

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error devolviendo la Orden con id: ${id}`,
    });
  }
};

export const deleteOrders = async (req, res) => {
  const { id } = req.params;
  try {
    await Orders.findByIdAndDelete(id);
    res.json({
      message: "La Orden ha sido Eliminada",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error Eliminando la Orden con id: ${id}`,
    });
  }
};

export const updateOrders = async (req, res) => {
  await Orders.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: "Orden Actualizada",
  });
};
