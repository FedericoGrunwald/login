const Mongoose = require("mongoose");

const TodoSchema = new Mongoose.Schema({
  id: { type: Object },
  idUser: { type: String, require: true },
  title: { type: String, require: true },
  completed: { type: Boolean, require: true },
});

module.exports = Mongoose.model("Todo", TodoSchema);
