const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All video
router.get("/", (req, res) => {
    connection.query("SELECT * from video", (err, results) => {
        if (err) {
            res.status(500).send("Error retrieving video");
        } else {
            res.json(results);
        }
    });
});

// Create a new video
router.post("/new", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO video SET ?", formData, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Modify a video
router.put("/:id", (req, res) => {
    const idUrl = req.params.id;
    const formData = req.body;
    console.log(idUrl, formData);

    connection.query(
        "UPDATE video SET ? WHERE idvideo = ?",
        [formData, idUrl],
        err => {
            if (err) {
                res.status(500).send("Error modifying video");
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// Delete ONE video
router.delete("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query("DELETE FROM video WHERE idvideo = ?", [idUrl], err => {
        if (err) {
            res.status(500).send("Error deleting video");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;

