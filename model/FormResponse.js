// models/FormResponse.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormResponseSchema = new Schema({
  formID: { type: mongoose.Schema.Types.ObjectId, ref: "FormField" },
  responses: [
    {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FormResponse", FormResponseSchema);
