const express = require("express");

const router = express.Router();

const messages = [
  {
    text: "I am a test message",
    user: "Sarah",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Francois",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Messages", messages });
});

router.get("/new", (req, res, next) => {
  res.render("form", { title: "New message" });
});

router.post("/new", (req, res, next) => {
  const { newMessage, newUser } = req.body;
  messages.push({ text: newMessage, user: newUser, added: new Date() });
  res.redirect("/");
});

module.exports = router;
