import app from "./app";
import { config } from "dotenv";

config({ path: "/.env" });

const addNumber = (a: number, b: number): number => {
  return a + b;
};

const PORT = process.env.PORT || 4000;

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello Typescript app",
    success: true,
  });
});

const answer = addNumber(120, 30);

console.log(answer);

app.listen(PORT, () => {
  console.log(`Server is Running is http://localhost:${PORT}`);
});
