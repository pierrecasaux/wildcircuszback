const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All game
router.get("/", (req, res) => {
    connection.query("SELECT * from game", (err, results) => {
        if (err) {
            res.status(500).send("Error retrieving game");
        } else {
            res.json(results);
        }
    });
});

// Create a new game
router.post("/new", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO game SET ?", formData, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Modify a game
router.put("/:id", (req, res) => {
    const idUrl = req.params.id;
    const formData = req.body;
    console.log(idUrl, formData);

    connection.query(
        "UPDATE game SET ? WHERE idgame = ?",
        [formData, idUrl],
        err => {
            if (err) {
                res.status(500).send("Error modifying game");
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// Delete ONE game
router.delete("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query("DELETE FROM game WHERE idgame = ?", [idUrl], err => {
        if (err) {
            res.status(500).send("Error deleting game");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;

