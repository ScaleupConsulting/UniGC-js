const controller = require("../build/Release/GameController.node");

controller.startTimer()
const { sendAllClients } = require("./websocket");
let isRunning = false;
export function cTimer() {
    console.log(controller);
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
        controller.startTimer();
        return;
    }
    isRunning = true;
    getState();
    controller.startTimer(10);
    while (true) {
        let tm = controller.proceed();

        sendAllClients({ type: "c_time", value: tm / 1000 });
        await sleep(200);
    }
}
async function getState() {

    while (true) {
        let obj = controller.getState();

        sendAllClients({ type: "stateUpdate", value: obj });
        await sleep(5000);
    }
}
export default main;
