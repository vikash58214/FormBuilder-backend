const express = require("express");
const folder = require("../model/folder");
const folderRouter = express.Router();

folderRouter.post("/createFolder", async (req, res) => {
  try {
    const newFolder = await folder.create(req.body);
    res.json({ message: "success", folder: newFolder });
  } catch (error) {
    res.sendStatus(500).json({ message: "Error in creating folder", error });
  }
});

folderRouter.get("/getFolder/:folderOwner", async (req, res) => {
  try {
    const folderOwner = req.params.folderOwner;
    const allFolder = await folder.find({ folderOwner });
    res.json(allFolder);
  } catch (error) {
    res.json(error);
  }
});

folderRouter.delete("/deleteFolder/:id", async (req, res) => {
  try {
    const folderID = req.params.id;
    const deleteFolder = await folder.findByIdAndDelete(folderID);
    if (deleteFolder) {
      res.json({ message: "success" });
    } else {
      res.json(404).json({ message: "folder not found" });
    }
  } catch (error) {
    res.sendStatus(500).json({ message: "Error deleting folder", error });
  }
});

module.exports = folderRouter;
