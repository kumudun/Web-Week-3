/* feedbackLib.js
Data model:
{
  id: number,
  sender: string,
  message: string,
  rating: 1..5
}
*/

let feedbackArray = [];
let nextId = 1;

// --- Helpers ---
const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const isValidRating = (v) =>
  typeof v === "number" && Number.isFinite(v) && v >= 1 && v <= 5;

// --- CRUD core (no Express here) ---
const getAll = () => feedbackArray;

const addOne = (sender, message, rating) => {
  if (!isNonEmptyString(sender) || !isNonEmptyString(message) || !isValidRating(rating)) {
    return false; // let handler translate to 400
  }
  const newItem = {
    id: nextId++,
    sender: sender.trim(),
    message: message.trim(),
    rating
  };
  feedbackArray.push(newItem);
  return newItem;
};

const findById = (id) => feedbackArray.find((f) => f.id === id) || null;

const updateById = (id, updates) => {
  const item = findById(id);
  if (!item) return null;

  const { sender, message, rating } = updates;

  if (sender !== undefined) {
    if (!isNonEmptyString(sender)) return false;
    item.sender = sender.trim();
  }
  if (message !== undefined) {
    if (!isNonEmptyString(message)) return false;
    item.message = message.trim();
  }
  if (rating !== undefined) {
    if (!isValidRating(rating)) return false;
    item.rating = rating;
  }
  return item;
};

const removeById = (id) => {
  const idx = feedbackArray.findIndex((f) => f.id === id);
  if (idx === -1) return false;
  feedbackArray.splice(idx, 1);
  return true;
};

module.exports = {
  // helpers (exported only if you want to unit-test)
  isNonEmptyString,
  isValidRating,
  // CRUD
  getAll,
  addOne,
  findById,
  updateById,
  removeById
};

// --- Quick local tests: `node feedbackLib.js` ---
if (require.main === module) {
  console.log("Add one:", addOne("John Smith", "Great session!", 4));
  console.log("All:", getAll());
  console.log("Find id=1:", findById(1));
  console.log("Update id=1:", updateById(1, { rating: 5 }));
  console.log("Remove id=1:", removeById(1));
  console.log("All after remove:", getAll());
}
