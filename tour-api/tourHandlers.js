const Tour = require("./tourLib");

// GET /tours
const getAllTours = (req, res) => {
  res.json(Tour.getAll());
};

// POST /tours
const createTour = (req, res) => {
  const { name, info, image, price } = req.body;
  const created = Tour.addOne(name, info, image, price);
  if (!created) {
    return res.status(400).json({ error: "name, info, image, price are required" });
  }
  res.status(201).json(created);
};

// GET /tours/:tourId
const getTourById = (req, res) => {
  const { tourId } = req.params;
  const tour = Tour.findById(tourId);
  if (!tour) return res.status(404).json({ error: "Tour not found" });
  res.json(tour);
};

// PUT /tours/:tourId
const updateTour = (req, res) => {
  const { tourId } = req.params;
  const updated = Tour.updateOneById(tourId, req.body || {});
  if (!updated) return res.status(404).json({ error: "Tour not found" });
  res.json(updated);
};

// DELETE /tours/:tourId
const deleteTour = (req, res) => {
  const { tourId } = req.params;
  const ok = Tour.deleteOneById(tourId);
  if (!ok) return res.status(404).json({ error: "Tour not found" });
  // 204 = No Content
  res.status(204).send();
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
