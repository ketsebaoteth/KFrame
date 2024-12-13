import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

interface InfoUpdatePayload {
  mainRole?: string;
  moto?: string;
  word?: string;
  homeImageUrl?: string;
  aboutImageUrl?: string;
  aboutDescription?: string;
}

const updateInfo = async (c: Context) => {
  try {
    const dataUser = await c.req.json();

    const user = await getUser(c);
    if (!user) {
      return c.json({ error: "Unauthorized: User not found" }, 401);
    }

    // Validate data format (optional)
    if (typeof dataUser !== "object" || !dataUser) {
      return c.json({ error: "Invalid payload format" }, 400);
    }

    let info = await prisma.info.findUnique({
      where: { userId: user.id },
    });

    if (!info) {
      info = await prisma.info.create({
        data: {
          userId: user.id,
          github: "",
          ...dataUser,
        },
      });
    } else {
      info = await prisma.info.update({
        where: { userId: user.id },
        data: dataUser,
      });
    }

    return c.json({ success: true, data: info }, 200);
  } catch (err) {
    console.error("Error updating info:", err);

    // Better error responses based on the type of error
    if (err instanceof Error) {
      return c.json({ error: `Error: ${err.message}` }, 500);
    }

    return c.json({ error: "Internal server error" }, 500);
  }
};

export default updateInfo;
