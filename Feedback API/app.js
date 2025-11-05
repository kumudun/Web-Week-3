const express = require("express");
const app = express();

const {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
} = require("./feedbackHandlers");

app.use(express.json());

app.get("/feedback", getAllFeedbacks);
app.post("/feedback", createFeedback);
app.get("/feedback/:feedbackId", getFeedbackById);
app.put("/feedback/:feedbackId", updateFeedback);
app.delete("/feedback/:feedbackId", deleteFeedback);

// optional health check
app.get("/", (req, res) => res.status(200).json({ ok: true }));

const port = 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
