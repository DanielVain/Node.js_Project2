const express = require("express");
const router = express.Router();
const UsersModel = require("../../model/users");

router.get("/", async (req, res) => {
	try {
		const data = await UsersModel.selectUserByEmail(req.jwtData.email);
		res.json({
			status: 200,
			user: {
				name: data[0].name,
				email: data[0].email,
				biz: data[0].biz,
			},
		});
	} catch (error) {
		res.json({
			status: 401,
			message: "Invalid Token",
		});
	}
});

module.exports = router;
