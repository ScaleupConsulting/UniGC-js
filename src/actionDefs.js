import engine from "./engine";

// interface GenericAction {
//   team: string;
// }
// interface AgentAction extends GenericAction {
//   agentId: string;
// }
// interface KickAction extends AgentAction {
//   kickSpecific?: string;
// }

const actionList = [
  {
    actionName: "goal_kick",
    ui_name: "Goal Kick",
    actionDesc: "",
    actionDef: (params, args) => {
      // isLegal();
      engine();
    },
  },
  {
    actionName: "d_f_kick",
    ui_name: "Direct Free Kick",
    actionDesc: "",
    actionDef: (params, args) => {
      console.log(params);
      console.log(args);
    },
  },
  {
    actionName: "c_kick",
    ui_name: "Corner Kick",
    actionDesc: "",
    actionDef: (params, args) => {
      console.log(params);
      console.log(args);
    },
  },
  {
    actionName: "p_kick",
    ui_name: "Penalty Kick",
    actionDesc: "",
    actionDef: (params, args) => {
      console.log(params);
      console.log(args);
    },
  },
  {
    actionName: "ind_f_kick",
    ui_name: "Indirect Free Kick",
    actionDesc: "",
    actionDef: (params, args) => {
      console.log(params);
      console.log(args);
    },
  },
  {
    actionName: "throw_in",
    ui_name: "Throw-In",
    actionDesc: "",
    actionDef: (params, args) => {
      console.log(params);
      console.log(args);
    },
  },
];

export default actionList;
