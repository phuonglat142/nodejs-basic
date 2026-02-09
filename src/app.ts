import "dotenv/config";
import express from "express";
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
