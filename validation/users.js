const Joi = require("joi");

const loginSkeleton = {
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: {
				allow: ["com", "net"],
			},
		})
		.messages({
			"string.empty": "Please input an email",
			"string.email": "Please enter emails using .com, .net",
		})
		.required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
		.required()
		.messages({
			"string.empty": "Please enter a password",
			"string.pattern.base":
				"Please enter a valid password (3-30 characters)",
		}),
};

const registerSkeleton = {
	name: Joi.string().min(3).max(20).required().messages({
		"string.empty": "Please enter a name",
		"string.min": "name must be 3-20 characters long",
		"string.max": "name must be 3-20 characters long",
	}),
	...loginSkeleton,
	biz: Joi.boolean().default(false),
};

const loginSchema = Joi.object(loginSkeleton);
const registerSchema = Joi.object(registerSkeleton);

module.exports = {
	loginSchema,
	registerSchema,
};
