const express = require("express");
const router = express.Router();
const con = require("../db");
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  con.query(
    "SELECT * FROM UserTable WHERE Username = ?",
    [username],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          data: { error: err },
        });
      }

      if (result && result.length === 0) {
        return res.status(200).json({
          data: { success: false },
        });
      } else {
        bcrypt.compare(password, result[0].Password, (err, passwordMatch) => {
          console.log(result[0].Password);
          if (passwordMatch) {
            return res.status(200).json({
              data: { success: true },
            });
          } else {
            return res.status(200).json({
              data: { success: false },
            });
          }
        });
      }
    }
  );
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  con.query(
    "SELECT * FROM UserTable WHERE username=?",
    username,
    (err, result) => {
      if (result && result.length > 0) {
        return res.status(200).json({
          data: { error: "Username is not available" },
        });
      } else {
        con.query(
          "SELECT * FROM UserTable WHERE email=?",
          email,
          (err, result) => {
            if (result && result.length > 0) {
              return res.status(200).json({
                data: { error: "Email already in use" },
              });
            } else {
              con.query(
                "INSERT INTO UserTable (username, email, password) VALUES (?, ?, ?)",
                [username, email, hashedPassword],
                (err, result) => {
                  if (err) {
                    return res.status(400).json({
                      data: { error: err },
                    });
                  } else {
                    return res.status(200).json({
                      data: { success: true },
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
