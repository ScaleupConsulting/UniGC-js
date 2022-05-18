const timerr = require("../build/Release/nodeExperiments.node");
const { sendAllClients } = require("./websocket");
let isRunning = false;
export function cTimer() {
  console.log(timerr);
}

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

async function main() {
  if (isRunning) {
    console.log("running");
    timerr.startTimer(10);
    return;
  }
  isRunning = true;
  getState(timerr);
  timerr.startTimer(10);
  while (true) {
    let tm = timerr.getTime();

    sendAllClients({ type: "c_time", value: tm / 1000 });
    await sleep(200);
  }
}
async function getState(timer) {
  while (true) {
    let obj = timer.getState();

    sendAllClients({ type: "stateUpdate", value: obj });
    await sleep(5000);
  }
}
// main();
export default main;
