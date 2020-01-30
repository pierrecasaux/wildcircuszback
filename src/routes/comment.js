const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All comment
router.get("/", (req, res) => {
    connection.query("SELECT * from comment", (err, results) => {
        if (err) {
            res.status(500).send("Error retrieving comment");
        } else {
            res.json(results);
        }
    });
});

// Create a new comment
router.post("/new", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO comment SET ?", formData, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Modify a comment
router.put("/:id", (req, res) => {
    const idUrl = req.params.id;
    const formData = req.body;
    console.log(idUrl, formData);

    connection.query(
        "UPDATE comment SET ? WHERE idcomment = ?",
        [formData, idUrl],
        err => {
            if (err) {
                res.status(500).send("Error modify comment");
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// Delete ONE comment
router.delete("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query("DELETE FROM comment WHERE idcomment = ?", [idUrl], err => {
        if (err) {
            res.status(500).send("Error deleting");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;

