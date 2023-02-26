const server = require("json-server");
const app = server.create();
const middlewares = server.defaults();
const port = process.env.PORT || 3000;

app.use(middlewares);
app.use(server.router("db.json"));

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
