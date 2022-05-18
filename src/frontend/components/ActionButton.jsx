import React from "react";
import { sendAction } from "../actionHandlers";
import { ws } from "../socketHandler";

export function getGameActionButtons(actions, maxButtons, onClick, isMobile = false) {
  let _actions = [];
  actions.forEach((a, i) => {
    if (i == maxButtons) {
      _actions.push(
        <ActionButton
          disabled={false}
          isMobile={isMobile}
          // teamId={-1}
          // agentId={-1}
          visible={true}
          actionName={"More Buttons"}
          color={"bg-gray-500"}
          // onClick={onclick} //show list
          key={"center_morebuttons"}
        ></ActionButton>
      );
    } else {
      _actions.push(
        <ActionButton
          disabled={false}
          isMobile={isMobile}
          // teamId={-1}
          // agentId={-1}
          visible={!(i >= maxButtons)}
          actionName={a.actionName}
          color={"bg-action-blue"}
          onClick={onclick}
          key={"center_" + a.actionName}
        ></ActionButton>
      );
    }
  });
  return _actions;
}

export const ActionButton = ({ disabled, teamId, agentId, actionName, color, onClick, isMobile, visible = true }) => {
  [];
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        // sendAction(actionName, teamId, agentId);
        onClick();
        if (actionName == "Goal Kick") ws.send(JSON.stringify({ type: "action", actionName: "goal_kick", team: teamId }));
      }}
      className={`col-span-1 z-40 ${disabled ? "disabled" : ""} ${
        isMobile ? " p-4 rounded-xl tracking-wide" : "text-xs md:text-sm lg:text-md p-2 rounded-md "
      } ${visible ? "" : "hidden"} ${color}  capitalize`}
    >
      {actionName}
    </button>
  );
};
