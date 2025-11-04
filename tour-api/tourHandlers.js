const Tour = require("./tourLib");

// GET /tours
const getAllTours = (req, res) => {
  res.status(200).json(Tour.getAll());
};

// POST /tours
const createTour = (req, res) => {
  const { name, info, image, price } = req.body;
  const created = Tour.addOne(name, info, image, price);
  if (!created) return res.status(400).json({ error: "Invalid tour data" });
  res.status(201).json(created);
};

// GET /tours/:tourId
const getTourById = (req, res) => {
  const id = parseInt(req.params.tourId, 10);
  const item = Tour.findById(id);
  if (!item) return res.status(404).json({ error: "Tour not found" });
  res.status(200).json(item);
};

// PUT /tours/:tourId
const updateTour = (req, res) => {
  const id = parseInt(req.params.tourId, 10);
  const updated = Tour.updateById(id, req.body);
  if (updated === null) return res.status(404).json({ error: "Tour not found" });
  if (updated === false) return res.status(400).json({ error: "Invalid fields" });
  res.status(200).json(updated);
};

// DELETE /tours/:tourId
const deleteTour = (req, res) => {
  const id = parseInt(req.params.tourId, 10);
  const ok = Tour.deleteById(id);
  if (!ok) return res.status(404).json({ error: "Tour not found" });
  res.status(204).send(); // No Content
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
