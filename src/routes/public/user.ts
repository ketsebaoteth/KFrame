import { Hono } from "hono";
import getUserDataPublic from "../../controllers/user/getUserData";

const publicUserRouter = new Hono();

publicUserRouter.get("/:id", getUserDataPublic);

export default publicUserRouter;
