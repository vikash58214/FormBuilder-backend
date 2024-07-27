const express = require("express");
const Form = require("../model/form");
const formRouter = express.Router();

formRouter.post("/api/forms", async (req, res) => {
  try {
    const { fields, folderID } = req.body;
    const form = new Form({ fields, folderID });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json(error);
  }
});

formRouter.get("/api/formfields/:formID", async (req, res) => {
  try {
    const formFields = await Form.findById(req.params.formID);
    if (formFields) {
      formFields.clickCount += 1;
      await formFields.save();
    }
    res.status(200).json(formFields);
  } catch (error) {
    res.status(500).json(error);
  }
});

formRouter.get("/api/allforms/:folderID", async (req, res) => {
  try {
    const allForms = await Form.find({ folderID: req.params.folderID });
    res.status(200).json(allForms);
  } catch (error) {
    res.status(500).json(error);
  }
});

formRouter.delete("/deleteForm/:formID", async (req, res) => {
  try {
    const deletedForms = await Form.findByIdAndDelete(req.params.formID);
    if (deletedForms) {
      res.status(200).json({ message: "deleted success" });
    } else {
      res.status(404).json({ message: "forms not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = formRouter;
