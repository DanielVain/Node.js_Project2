const express = require("express");
const router = express.Router();
const cardValidation = require("../../validation/cards");
const CardModel = require("../../model/card");
const UserModel = require("../../model/users");
const jwt = require("../../config/jwt");

router.post("/", async (req, res) => {
	try {
		const value = await cardValidation.cardSchema.validateAsync(req.body, {
			abortEarly: false,
		});
		const userData = await UserModel.selectUserByEmail(req.jwtData.email);
		const user_id = userData[0]._id;
		let bizNumber = Math.floor(Math.random() * 999999999);
		let isBizNumberOk = await CardModel.findCardByBizNumber(bizNumber);
		if (isBizNumberOk.length == 0) {
			const createdBizCard = await CardModel.insertCard(
				value.bizName,
				value.bizDesc,
				value.bizAddr,
				value.bizPhone,
				value.bizPic,
				bizNumber,
				user_id
			);

			res.json({
				status: 200,
				msg: "Business Card Has Been Created",
				bizCard: createdBizCard,
			});
		}
	} catch (err) {
		res.json({ status: 400, err: err });
	}
});

module.exports = router;
