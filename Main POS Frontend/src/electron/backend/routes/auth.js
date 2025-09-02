import express from "express";
import passport from "passport";
import { createUser } from "../models/Users.js";

const router = express.Router();

// Registerx
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;
    const newUser = await createUser(username, password, role); 
    newUser.success? 
        res.json(newUser)
        :
        res.status(500).json(newUser);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Passport error:", err);
      return res.status(500).json({ error : err });
    }

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login failed" });
      }
      return res.json({ user });
    });
  })(req, res, next);
});

// Logout
router.post("/logout", (req, res) => {
  req.logout((err)=>{
    if (err) return res.status(500).json({error : "Could not Sign Out"});
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ error: "Failed to destroy session" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out" });
    });

  })
});


// router.post("/logout", (req, res) => {
//   req.logout(() => res.json({ message: "Logged out" }));
// });

// Session check
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

export default router;
