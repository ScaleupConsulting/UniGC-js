import { Action, Agent } from "./lib/types";
import { ws } from "./socketHandler";

export function sendAction(actionId, agent, cb) {
  console.log(actionId);
  console.log(agent);
  ws.send(
    JSON.stringify({
      type: "action",
      actionId: actionId,
      team: agent.teamId,
      agent: agent.agentId,
    })
  );
}
