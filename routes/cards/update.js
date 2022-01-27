const express = require("express");
const router = express.Router();
const CardModel = require("../../model/card");
const cardValidation = require("../../validation/cards");

router.put("/:id", async (req, res) => {
	try {
		const value = await cardValidation.cardNotRequiredSchema.validateAsync(
			req.body,
			{ abortEarly: false }
		);
		await CardModel.findCardAndUpdate(req.params.id, value);
		res.json({
			status: 200,
			msg: "Card has been updated!",
		});
	} catch (err) {
		res.json({ status: 400, err: err });
	}
});
module.exports = router;
