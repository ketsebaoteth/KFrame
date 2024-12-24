import { Hono } from "hono";
import { auth } from "./lib/auth";
import homeRouter from "./routes/info";
import userRouter from "./routes/user";
import aboutRouter from "./routes/about";
import projectRoute from "./routes/project";
import articleRoute from "./routes/article";
import publicProject from "./routes/public/project";
import publicArticle from "./routes/public/article";
import linkRoute from "./routes/links";
import publicLink from "./routes/public/link";
import testimonyRouter from "./routes/testimony";
import publicTestimony from "./routes/public/testimony";
import { cors } from "hono/cors";
import resoursesRoute from "./routes/resources";
import skillRoute from "./routes/skill";
import publicSkill from "./routes/public/skill";
import infoRouter from "./routes/info";
import publicInfo from "./routes/public/info";
import publicUserRouter from "./routes/public/user";

const app = new Hono();

app.use(
  "/*",
  cors({
    // origin: "http://localhost:3001",
    origin: "https://frame.nerdspacer.com",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable credentials
  })
);

app.options("/*", (c) => {
  return c.text("", 204, {
    // "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Origin": "https://frame.nerdspacer.com",
    "Access-Control-Allow-Methods":
      "GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Custom-Header, Upgrade-Insecure-Requests, Content-Type, Authorization",
    "Access-Control-Max-Age": "600",
  });
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
   return auth.handler(c.req.raw);
});

app.get("/api/auth/*", (c) => auth.handler(c.req.raw));
app.post("/api/auth/*", cors(), (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("test confirmed 01");
});

app.route("/home", homeRouter);
app.route("/user", userRouter);
app.route("/about", aboutRouter);
app.route("/projects", projectRoute);
app.route("/article", articleRoute);
app.route("/links", linkRoute);
app.route("/testimony", testimonyRouter);
app.route("/resource", resoursesRoute);
app.route("/skills", skillRoute);
app.route("/info", infoRouter);

//public api's
app.route("/public/projects", publicProject);
app.route("/public/articles", publicArticle);
app.route("/public/links", publicLink);
app.route("/public/testimony", publicTestimony);
app.route("/public/skills", publicSkill);
app.route("/public/info", publicInfo);
app.route("/public/user", publicUserRouter);

export default app;
