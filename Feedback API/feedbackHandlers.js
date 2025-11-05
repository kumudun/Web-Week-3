// feedbackHandlers.js
const Feedback = require("./feedbackLib");

// GET /feedback
const getAllFeedbacks = (req, res) => {
  const all = Feedback.getAll();
  res.status(200).json({ ok: true, data: all });
};

// POST /feedback  (200 instead of 201)
const createFeedback = (req, res) => {
  const { sender, message, rating } = req.body;
  const created = Feedback.addOne(sender, message, rating);
  if (!created) {
    // still 200 per requirement, but indicate failure in body
    return res.status(200).json({
      ok: false,
      error: "Invalid payload. Required: non-empty 'sender', non-empty 'message', 'rating' 1..5."
    });
  }
  res.status(200).json({
    ok: true,
    message: "Feedback created.",
    data: created
  });
};

// GET /feedback/:feedbackId
const getFeedbackById = (req, res) => {
  const id = Number(req.params.feedbackId);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(200).json({ ok: false, error: "feedbackId must be a positive integer." });
  }
  const item = Feedback.findById(id);
  if (!item) return res.status(200).json({ ok: false, error: "Feedback not found." });
  res.status(200).json({ ok: true, data: item });
};

// PUT /feedback/:feedbackId
const updateFeedback = (req, res) => {
  const id = Number(req.params.feedbackId);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(200).json({ ok: false, error: "feedbackId must be a positive integer." });
  }

  const allowed = ["sender", "message", "rating"];
  const badKeys = Object.keys(req.body).filter((k) => !allowed.includes(k));
  if (badKeys.length) {
    return res.status(200).json({ ok: false, error: `Unknown fields: ${badKeys.join(", ")}` });
  }

  const result = Feedback.updateById(id, req.body);
  if (result === null) return res.status(200).json({ ok: false, error: "Feedback not found." });
  if (result === false) {
    return res.status(200).json({
      ok: false,
      error: "Invalid payload. 'sender' and 'message' must be non-empty strings; 'rating' must be 1..5."
    });
  }
  res.status(200).json({ ok: true, message: "Feedback updated.", data: result });
};

// DELETE /feedback/:feedbackId  (200 instead of 204/404)
const deleteFeedback = (req, res) => {
  const id = Number(req.params.feedbackId);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(200).json({ ok: false, error: "feedbackId must be a positive integer." });
  }
  const ok = Feedback.removeById(id);
  if (!ok) return res.status(200).json({ ok: false, error: "Feedback not found." });
  res.status(200).json({ ok: true, message: "Feedback deleted.", id });
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
};
