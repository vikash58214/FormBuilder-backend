const mongoose = require("mongoose");

const Form = mongoose.model("FormField", {
  fields: [
    {
      value: { type: String, required: true },
      content: { type: String, default: "" }, // For fields like 'text', 'email', etc.
    },
  ],
  clickCount: { type: Number, default: 0 },
  folderID: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
});

module.exports = Form;
