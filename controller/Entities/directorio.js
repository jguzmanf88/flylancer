const db = require("../../models");
const Directorio = db.Directorio;
const Op = db.Sequelize.Op;

// Create and Save a new Directorio
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Directorio
    const directorio = {
        title: req.body.nombre,
        imagen: req.body.imagen,
        puesto: req.body.puesto,
        email: req.body.email
    };

    // Save Directorio in the database
    Directorio.create(directorio)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Directorio."
            });
        });
};

// Retrieve all Directorios from the database.
exports.findAll = (req, res) => {
    Directorio.findAll({ limit: 10 })

    Directorio.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Directorios."
            });
        });

};

// Find a single Directorio with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Directorio.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Directorio with id=" + id
            });
        });
};

// Update a Directorio by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Directorio.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Directorio was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Directorio with id=${id}. Maybe Directorio was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Directorio with id=" + id
            });
        });
};

// Delete a Directorio with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Directorio.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Directorio was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Directorio with id=${id}. Maybe Directorio was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Directorio with id=" + id
            });
        });
};

// Delete all Directorios from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Directorios
exports.findAllPublished = (req, res) => {
    Directorio.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Directorios."
            });
        });
};