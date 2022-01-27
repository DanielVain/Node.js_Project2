const express = require("express");
const router = express.Router();
const CardModel = require("../../model/card");

router.delete("/", async (req, res) => {
	try {
		const cardNumber = await CardModel.deleteCardById(req.body.id);
		if (cardNumber) {
			res.json({
				status: 200,
				msg: "Card has been deleted with id of " + req.body.id,
			});
		} else throw "Card doesn't exist";
	} catch (err) {
		res.json({ status: 400, msg: err });
	}
});

module.exports = router;
