import * as express from "express";
import path from "path";

const app = express();

let p = path.join(__dirname, "..", "/renderer"); //path for static serve, should direct to webpack renderer, should work for both dev and prod
console.log(p); // just to make sure the path is right
app.use(express.static(p));

// app.get('/api', (req, res) => {
// })

function startServer(port = 3007) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

export { startServer };
