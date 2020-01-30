const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All ranking
router.get("/", (req, res) => {
    connection.query("SELECT * from ranking", (err, results) => {
        if (err) {
            res.status(500).send("Error retrieving ranking");
        } else {
            res.json(results);
        }
    });
});

// Create a new ranking
router.post("/new", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO ranking SET ?", formData, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Modify a ranking
router.put("/:id", (req, res) => {
    const idUrl = req.params.id;
    const formData = req.body;
    console.log(idUrl, formData);

    connection.query(
        "UPDATE ranking SET ? WHERE idranking = ?",
        [formData, idUrl],
        err => {
            if (err) {
                res.status(500).send("Error modifying ranking");
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// Delete ONE ranking
router.delete("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query("DELETE FROM ranking WHERE idranking = ?", [idUrl], err => {
        if (err) {
            res.status(500).send("Error deleting ranking");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;

