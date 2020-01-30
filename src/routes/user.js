const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All user
router.get("/", (req, res) => {
    connection.query("SELECT * from user", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Create a new user
router.post("/new", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO user SET ?", formData, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Modify a user
router.put("/:id", (req, res) => {
    const idUrl = req.params.id;
    const formData = req.body;
    console.log(idUrl, formData);

    connection.query(
        "UPDATE user SET ? WHERE iduser = ?",
        [formData, idUrl],
        err => {
            if (err) {
                res.status(500).send("Error modifying user");
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// Delete ONE user
router.delete("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query("DELETE FROM user WHERE iduser = ?", [idUrl], err => {
        if (err) {
            res.status(500).send("Error deleting user");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;

