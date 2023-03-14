import Express from "express";

const app = Express();

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
