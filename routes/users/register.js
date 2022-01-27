const express = require("express");
const router = express.Router();
const joi = require("../../validation/users");
const bcrypt = require("../../config/bcrypt");
const UsersModel = require("../../model/users");

router.post("/", async (req, res) => {
	try {
		const value = await joi.registerSchema.validateAsync(req.body, {
			abortEarly: false,
		});
		value.password = await bcrypt.createHash(value.password);
		const dbData = await UsersModel.selectUserByEmail(value.email);
		if (dbData.length != 0) {
			throw "Emails already exists";
		} else {
			const userData = await UsersModel.insertUser(
				value.name,
				value.email,
				value.password,
				value.biz
			);
			res.json({
				status: 200,
				message: "User successfully registered",
				user: [userData.name, userData.email],
			});
		}
	} catch (err) {
		if (typeof err == "string") {
			res.json({
				status: 400,
				message: err,
			});
		} else {
			errArr = err.details;
			for (let err of errArr)
				res.json({
					status: 400,
					message: err.message,
				});
		}
	}
});

module.exports = router;
