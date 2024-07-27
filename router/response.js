const express = require("express");
const FormResponse = require("../model/FormResponse");
const responseRouter = express.Router();

responseRouter.post("/formresponses", async (req, res) => {
  const { formID, responseID, responses } = req.body;

  try {
    let formResponse;

    if (responseID) {
      // Find the form response document by responseID
      formResponse = await FormResponse.findById(responseID);

      if (formResponse) {
        // Filter out responses that are already in the database
        const newResponses = responses.filter(
          (newResponse) =>
            !formResponse.responses.some(
              (existingResponse) =>
                existingResponse.label === newResponse.label &&
                existingResponse.value === newResponse.value
            )
        );

        // Append only new responses
        formResponse.responses.push(...newResponses);
        await formResponse.save();
      } else {
        return res.status(404).json({ message: "Response not found" });
      }
    } else {
      // Create a new form response document
      formResponse = new FormResponse({ formID, responses });
      await formResponse.save();
    }

    res.status(200).json(formResponse);
  } catch (error) {
    res.status(500).json({ message: "Error saving response", error });
  }
});

responseRouter.get("/getFormResponse/:formID", async (req, res) => {
  try {
    const formID = req.params.formID;
    const getFormResponse = await FormResponse.find({ formID });
    res.json(getFormResponse);
  } catch (error) {
    res.json(error);
  }
});

module.exports = responseRouter;
