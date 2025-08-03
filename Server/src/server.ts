require("dotenv").config();
import express, { Express } from "express";
import { usersRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the CORS middleware
import { organizationRouter } from "./routes/organization.routes";
import { departmentRouter } from "./routes/departments.routes";
import { locationRouter } from "./routes/locations.routes";
import { rolesRouter } from "./routes/role.routes";
import { permissionRouter } from "./routes/permission.routes";
import { aiRouter } from "./routes/ai.routes";
import { reportsRouter } from "./routes/reports.routes";
import { areasRouter } from "./routes/areas.routes";
// import { guestRouter } from "./routes/guest.routes";
import "./jobs/recurringJob";
import { Server } from "socket.io";
import http from "http";
import { initializeSockets } from "./sockets";
import { callsRouter } from "./routes/calls/calls.routes";

const app: Express = express();
const port: Number = Number(process.env.PORT) || 3101;

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/organizations", organizationRouter);
app.use("/departments", departmentRouter);
app.use("/locations", locationRouter);
app.use("/calls", callsRouter);
app.use("/roles", rolesRouter);
app.use("/permissions", permissionRouter);
app.use("/ai", aiRouter);
app.use("/reports", reportsRouter);
app.use("/areas", areasRouter);
// app.use("/api/guest", guestRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);
initializeSockets(io);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
