import { Context } from "hono";
import getUser from "../../utils/user";
import prisma from "../../lib/db";

const updateLink = async (c: Context) => {
  try {
    const { github, linkedIn, x, telegram } = await c.req.json();
    const user = await getUser(c);

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    let infoData = await prisma.info.findUnique({
      where: { userId: user.id },
    });

    if (!infoData) {
      infoData = await prisma.info.create({
        data: {
          userId: user.id,
          github: "https://github.com/yeabnoah",
          word: "Developer",
        },
      });
    }

    let linksData = await prisma.links.findUnique({
      where: { infoId: infoData.id },
    });

    if (!linksData) {
      // Create a Links record if it doesn't exist
      linksData = await prisma.links.create({
        data: {
          infoId: infoData.id,
          github: "https://github.com/yeabnoah",
          linkedIn:
            "https://www.linkedin.com/in/yeabsra-ashebir-tech-nerd-8a3a80267/",
          x: "x.com/technerd556",
          telegram: "t.me/technerd345",
        },
      });
    }

    const linksDataFinal = await prisma.links.update({
      where: { infoId: infoData.id },
      data: {
        github,
        linkedIn,
        x,
        telegram,
      },
    });

    return c.json({ links: linksDataFinal }, 200);
  } catch (err) {
    console.error("Error updating links:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export default updateLink;
