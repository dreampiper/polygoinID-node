import { createServer } from "http";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index.mjs";
import createOrg from "./routes/createOrg.js";
import signinOrg from "./routes/signinOrg.js";
import createIssuer from "./routes/createIssuer.js";
import createClaim from "./routes/createClaim.js";
import createSchema from "./routes/createSchema.js";
dotenv.config();

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//Handle CORS
const corsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/signup", createOrg); //Create org --
app.use("/signin", signinOrg); //Signin & activate
app.use("/schema", createSchema); //Signin & activate
app.use("/issuer", createIssuer); //create an issuer
app.use("/create", createClaim); //Create claim offer and return id
app.use(express.static(`/public`));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

export default app;

const port = process.env.PORT || 4040;
const server = createServer(app);

server.listen(port, () => {
  console.log(`Listening to polygon-node on ${port}`);
});
