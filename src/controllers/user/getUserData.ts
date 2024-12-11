import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const getUserDataPublic = async (c: Context) => {
  try {
    const user = await getUser(c);
    const id = await c.req.param("id");

    const getUserInfo = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return c.json(getUserInfo, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default getUserDataPublic;
