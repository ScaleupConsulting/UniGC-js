export let ws = new WebSocket("ws://127.0.0.1:3002");

ws.onclose = (e) => {
  ws = new WebSocket("ws://127.0.0.1:3002");
};
