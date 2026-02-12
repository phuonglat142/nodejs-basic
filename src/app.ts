import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import apiRoutes from "routes/api";

const app = express();
const PORT = process.env.PORT || 8080;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors config
app.use(
  cors({
    origin: "*",
  }),
);

//routes
apiRoutes(app);

//global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    status: "error",
    statusCode: status,
    message: err.message || "Internal Server Error",
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
