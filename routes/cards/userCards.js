const express = require("express");
const router = express.Router();
const CardModel = require("../../model/card");

router.get("/:user_id", async (req, res) => {
	try {
		const userData = await CardModel.findUserCardsById(req.params.user_id);

		res.json({ status: 200, userCards: userData });
	} catch (err) {
		res.json({ status: 400, err: err });
	}
});

module.exports = router;
