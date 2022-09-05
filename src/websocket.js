import WebSocket from "ws";
import actionList from "./actionDefs";
const wsPort = 3003;

const wss = new WebSocket.Server({ port: wsPort });
console.log(`WS on port: ${wsPort}`);

wss.on("connection", function connection(ws, req) {
  // ws.on("open", () => {
  //   console.log("asdad");
  // });

  send({
    type: "setup",
    data: {
      teams: [
        {
          name: "MiPal",
          color: "#fb6963",
          score: 0
        },
        {
          name: "TjArk",
          color: "#0354ce",
          score: 0
        },
      ],
      actionList: [...actionList.map((a) => a.ui_name)],
    },

  });
  ws.on("close", function close() {
    console.log("[SERVER]: Client disconnected.");
  });

  ws.on("message", function incoming(recieveData) {
    console.log("[SERVER] Message:", recieveData);
    let jsonMsg;
    try {
      jsonMsg = JSON.parse(recieveData.toString());
    } catch (err) {
      //message is not object
      return;
    }

    if (jsonMsg && jsonMsg.type) {
      switch (jsonMsg.type) {
        case "action":
          if (jsonMsg.actionName) {
            actionList.find((a) => a.actionName == jsonMsg.actionName).actionDef({ team: jsonMsg.team }, 2);
          }
          break;
      }
    }

    // Example use
    // send(recieveData);

    // sendAll(recieveData);
  });

  // Send back to client
  function send(data) {
    data = JSON.stringify(data);
    ws.send(data);
  }

  // // Send to all clients
  // function sendAll(data: any) {
  //   data = JSON.stringify(data);

  //   wss.clients.forEach(function each(client) {
  //     client.send(data);
  //   });
  // }
});

export function sendAllClients(msg) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(msg));
  });
}
export default wss;
