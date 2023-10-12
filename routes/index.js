const express = require("express");
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const recentMessages = await Message.find()
      .sort({ timestamp: -1 })
      .populate("user")
      .limit(10)
      .exec();
    res.render("index", { user: res.locals.currentUser, recentMessages });
  })
);

router.get("/sign-up", (req, res) => res.render("sign-up-form"));

router.post("/sign-up", async (req, res, next) => {
  bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log(err);
    } else {
      try {
        const user = new User({
          email: req.body.email,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          membershipStatus: true,
        });
        const result = await user.save();
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/new-message", (req, res, next) => {
  res.render("new-message", {
    title: "New message",
    user: res.locals.currentUser,
  });
});

router.post("/new-message", async (req, res, next) => {
  const message = new Message({
    title: req.body.title,
    content: req.body.content,
    timestamp: new Date(),
    user: res.locals.currentUser,
  });
  const result = await message.save();
  res.redirect("/");
});

module.exports = router;
