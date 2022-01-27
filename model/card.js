const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	bizName: { type: String, required: true },
	bizDesc: { type: String, required: true },
	bizAddr: { type: String, required: true },
	bizPhone: { type: String, required: true },
	bizPic: { type: String, required: true },
	bizId: { type: Number, unique: true, required: true },
	user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Card = mongoose.model("cards", cardSchema);

const insertCard = (
	bizName,
	bizDesc,
	bizAddr,
	bizPhone,
	bizPic,
	bizId,
	user_id
) => {
	const card = new Card({
		bizName,
		bizDesc,
		bizAddr,
		bizPhone,
		bizPic,
		bizId,
		user_id,
	});
	return card.save();
};
const findCardByBizNumber = (bizId) => {
	return Card.find({ bizId: bizId });
};
const findCardById = (id) => {
	return Card.find({ _id: id });
};
const findUserCardsById = (user_id) => {
	return Card.find({ user_id: user_id });
};
const findCardAndUpdate = (_id, update) => {
	return Card.findByIdAndUpdate(_id, update);
};

const deleteCardById = (id) => {
	return Card.findOneAndDelete({ _id: id });
};

module.exports = {
	insertCard,
	findCardByBizNumber,
	findCardById,
	findUserCardsById,
	findCardAndUpdate,
	deleteCardById,
};
