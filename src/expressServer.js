const express = require("express");

const webApp = express();
const apiPort = 3007;

const webServer = webApp.listen(apiPort);

console.log(`API on port: ${apiPort}`);

// const p = path.resolve(__dirname, "..", "..", "out/unigc-forge-win32-x64/resources/app/.webpack/renderer/main_window");
// console.log(p);
webApp.use(express.static(path.join(__dirname, "..", "main_window", "renderer")));
webApp.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "renderer", "main_window", "index.html"));
});

webApp.use(express.json()); // for parsing application/json
webApp.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// webApp.use("/api", apiRouter);
