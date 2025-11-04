/* 
// Data model for a tour:
{
  "name": "Best of Paris in 7 Days Tour",
  "info": "Paris is synonymous with the finest things that culture can offer...",
  "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
  "price": "1,995"
}
*/

let tourArray = [];
let nextId = 1;

// ---------- Helpers ----------
const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const isValidPrice = (v) =>
  (typeof v === "string" && v.trim().length > 0) ||
  (typeof v === "number" && Number.isFinite(v) && v > 0);

// ---------- Get all tours ----------
const getAll = () => tourArray;

// ---------- Add one tour ----------
const addOne = (name, info, image, price) => {
  // Validate required fields
  if (!isNonEmptyString(name) || !isNonEmptyString(info) || !isNonEmptyString(image) || !isValidPrice(price)) {
    return false;
  }

  const newTour = {
    id: nextId++,
    name: name.trim(),
    info: info.trim(),
    image: image.trim(),
    price: typeof price === "string" ? price.trim() : price.toString(),
  };

  tourArray.push(newTour);
  return newTour;
};

// ---------- Find tour by ID ----------
const findById = (id) => {
  const item = tourArray.find((t) => t.id == id);
  return item ? item : false;
};

// ---------- Update tour by ID ----------
const updateOneById = (id, updatedData = {}) => {
  const item = findById(id);
  if (!item) return false;

  if (updatedData.name !== undefined) {
    if (!isNonEmptyString(updatedData.name)) return false;
    item.name = updatedData.name.trim();
  }

  if (updatedData.info !== undefined) {
    if (!isNonEmptyString(updatedData.info)) return false;
    item.info = updatedData.info.trim();
  }

  if (updatedData.image !== undefined) {
    if (!isNonEmptyString(updatedData.image)) return false;
    item.image = updatedData.image.trim();
  }

  if (updatedData.price !== undefined) {
    if (!isValidPrice(updatedData.price)) return false;
    item.price =
      typeof updatedData.price === "string"
        ? updatedData.price.trim()
        : updatedData.price.toString();
  }

  return item;
};

// ---------- Delete tour by ID ----------
const deleteOneById = (id) => {
  const item = findById(id);
  if (!item) return false;

  const initialLength = tourArray.length;
  tourArray = tourArray.filter((t) => t.id != id);
  return tourArray.length < initialLength; // true if deleted
};

// ---------- Test section ----------
if (require.main === module) {
  // Add sample tours
  let result = addOne(
    "Best of Paris in 7 Days Tour",
    "Join us for the Best of Paris experience!",
    "https://www.course-api.com/images/tours/tour-1.jpeg",
    "1,995"
  );
  console.log(result);

  result = addOne(
    "Highlights of Rome Tour",
    "Explore the Colosseum, Vatican, and Roman Forum in this 5-day tour.",
    "https://www.course-api.com/images/tours/tour-2.jpeg",
    "1,495"
  );
  console.log(result);

  console.log("getAll called:", getAll());
  console.log("findById called:", findById(1));

  console.log(
    "updateOneById called:",
    updateOneById(1, { price: "2,195", name: "Updated Paris Tour" })
  );
  console.log("findById after update:", findById(1));

  console.log("deleteOneById called:", deleteOneById(1));
  console.log("findById after delete:", findById(1));
}

// ---------- Export ----------
const Tour = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = Tour;

