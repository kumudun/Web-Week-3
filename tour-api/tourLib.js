// In-memory storage
let tours = [];
let nextId = 1;

// Helpers
const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

// CRUD functions
const getAll = () => tours;

const addOne = (name, info, image, price) => {
  if (![name, info, image, price].every(isNonEmptyString)) return false;

  const newItem = {
    id: nextId++,
    name: name.trim(),
    info: info.trim(),
    image: image.trim(),
    price: price.trim(), // keep as string (matches your model)
  };
  tours.push(newItem);
  return newItem;
};

const findById = (id) => tours.find((t) => t.id === id) || null;

const updateById = (id, data) => {
  const item = findById(id);
  if (!item) return null;

  const { name, info, image, price } = data;
  if (name !== undefined) {
    if (!isNonEmptyString(name)) return false;
    item.name = name.trim();
  }
  if (info !== undefined) {
    if (!isNonEmptyString(info)) return false;
    item.info = info.trim();
  }
  if (image !== undefined) {
    if (!isNonEmptyString(image)) return false;
    item.image = image.trim();
  }
  if (price !== undefined) {
    if (!isNonEmptyString(price)) return false;
    item.price = price.trim();
  }
  return item;
};

const deleteById = (id) => {
  const idx = tours.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tours.splice(idx, 1);
  return true;
};

module.exports = { getAll, addOne, findById, updateById, deleteById };

// Quick local test when running: node tourLib.js
if (require.main === module) {
  console.log("Add sample:", addOne("7 Days Tour", "Join us for the Best of Helsinki!", "https://www.course-api.com/images/tours/tour-x.jpeg", "1,495"));
  console.log("All:", getAll());
  console.log("Find id=1:", findById(1));
}
