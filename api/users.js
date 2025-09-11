 import express from "express";
 
const router = express.Router();

import { createUser, getUserByPassword, getUserById } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import bcrypt from "bcryptjs";


///POST /register creates a new User with the provided credentials and sends a token.
router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Request body requires: username, password");
    }
    const hashed = bcrypt.hashSync(password, 10);
    const user = await createUser(username, hashed);
     
    if (!user || !user.id) {
      return res.status(500).send("User creation failed.");

    }
    const userDetails = await getUserById(user.id);
    if (!userDetails) {
      return res.status(404).send("User not found.");
    }

    const token = createToken({ id: user.id });
    res.status(201).send(token);
  });

router
  .route("/login")
const { username, password } = req.body;
if (!username || !password) return res.status(400).send("Invalid username or password.");
const user = await getUserByPassword(username, password);
if (!user || !user.id) return res.status(401).send("Invalid username or password.");

const token = createToken({ id: user.id });
res.send(token);
  

export default router;