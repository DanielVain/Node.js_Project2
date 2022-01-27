const express = require("express");
const router = express.Router();
const CardModel = require("../../model/card");

router.get("/", async (req, res) => {
	try {
		const userData = await CardModel.findCardById(req.query.id);
		res.json({ status: 200, user: userData[0] });
	} catch (err) {
		res.json({ status: 400, err: err });
	}
});

module.exports = router;
