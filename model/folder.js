const mongoose = require("mongoose");

const folder = mongoose.model("Folder", {
  name: { type: String, required: true },
  folderOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = folder;
