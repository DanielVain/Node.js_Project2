const express = require("express");
const router = express.Router();
const joi = require("../../validation/users");
const bcrypt = require("../../config/bcrypt");
const UsersModel = require("../../model/users");
const jwt = require("../../config/jwt");

router.post("/", async (req, res) => {
	try {
		const value = await joi.loginSchema.validateAsync(req.body, {
			abortEarly: false,
		});
		const dbData = await UsersModel.selectUserByEmail(value.email);
		if (dbData.length != 0) {
			const isPassOk = await bcrypt.compareHash(
				value.password,
				dbData[0].password
			);
			console.log("isPassOk", isPassOk);
			if (isPassOk === true) {
				const token = await jwt.generateToken({
					name: dbData[0].name,
					email: dbData[0].email,
				});
				res.json({
					status: 200,
					message: "Welcome Back " + dbData[0].name,
					user: {
						name: dbData[0].name,
						biz: dbData[0].biz,
					},
					token: token,
				});
			} else {
				throw "Wrong Password";
			}
		} else {
			throw "This email doesn't exist";
		}
	} catch (err) {
		res.json({ status: 400, message: err });
	}
});

module.exports = router;
