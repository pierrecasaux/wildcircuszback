const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All credit
router.get("/", (req, res) => {
    connection.query("SELECT * from credit ORDER BY total DESC", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Create a new credit
router.post("/new", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO credit SET ?", formData, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Modify a credit
router.put("/:id", (req, res) => {
    const idUrl = req.params.id;
    const formData = req.body;
    console.log(idUrl, formData);

    connection.query(
        "UPDATE credit SET ? WHERE idcredit = ?",
        [formData, idUrl],
        err => {
            if (err) {
                res.status(500).send("Error modifying credit");
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// Delete ONE credit
router.delete("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query("DELETE FROM credit WHERE idcredit = ?", [idUrl], err => {
        if (err) {
            res.status(500).send("Error deleting credit");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
