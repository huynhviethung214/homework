const ApiError = require("../api-error");
const { ContactService } = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.utils");

exports.create = (req, res) => {
    res.send({ message: "create handler" })
};

exports.findAll = (req, res) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;

        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (e) {
        return next
    }
};

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler" })
};

exports.update = (req, res) => {
    res.send({ message: "update handler" })
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler" })
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" })
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" })
};

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch(e) {
        return next(new ApiError(500, "An error occured while creating the contact"));
    }
}
