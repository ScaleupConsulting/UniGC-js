import React, { useState } from "react";
import { ws } from "../socketHandler";
export function ActionsRadialButton(props) {
  const isRight = props.isRight;
  const [activated, setActivated] = useState(true);

  function actionOnClick(actionKey, teamId) {
    // setAgents(
    //   agents.map((a) => {
    //     a.teamId == teamId ? (a.selectable = true) : (a.selectable = false);
    //     return a;
    //   })
    // );
    if (props.selectedAction == actionKey) {
      // setAgents(
      //   agents.map((a) => {
      //     a.selectable = true;
      //     return a;
      //   })
      // );
      props.setSelectedAction(null);
    } else {
      props.setSelectedAction(actionKey);
    }
  }
  function getActions() {
    let actions = [];
    for (let i = 0; i < props.actions?.length || 0; i++) {
      let actionKey = `${props.teamId}_${props.actions[i].id}`;
      const angle = (360 / props.actions.length) * i;
      actions.push(
        // <ActionButton
        //   actionName={props.actions[i].name}
        //   color={color}
        //   disabled={selectedAction && selectedAction != actionKey}
        //   onClick={() => actionOnClick(actionKey, props.teamId)}
        //   key={actionKey}
        // />
        <div
          style={{
            transform: `rotate(${angle + "deg"}) translateX(50%)`,
            "transform-origin": "50% 50%",
          }}
          //   style={{
          //     "--tw-rotate": (360 / props.actions.length) * i + "deg",
          //     "--tw-translate-x": "50%",
          //     transform:
          //       "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          //   }}
          className={`absolute w-48 p-4  text-black text-center`}
        >
          <span
            onClick={() => {
              actionOnClick(actionKey, props.teamId);
              if (props.actions[i].name == "Goal Kick")
                ws.send(JSON.stringify({ type: "action", actionName: "goal_kick", team: props.teamId }));
            }}
            className={`bg-action-red ${
              angle > 180 && angle < 360 ? "rotate-180 " : "" //TODO: not really working need a fix
            }flex justify-center rounded-xl p-2 z-50 w-full hover:cursor-pointer `}
          >
            {props.actions[i].name}
          </span>
        </div>
      );
    }
    return actions;
  }
  return (
    <>
      {activated ? (
        <div
          className={`col-span-3 flex ${
            isRight ? "justify-self-center col-start-2" : "justify-self-center"
          } rounded-full w-36  h-36 justify-center  items-center`}
        >
          <div className="absolute h-96 w-96 border items-center border-stone-200 rounded-full justify-center flex overflow-hidden">
            {getActions()}
            {/* <div className="absolute h-96 w-4 text-black"></div>
            <div className="absolute h-96 w-4 text-black rotate-[30deg]">S</div>
            <div className="absolute h-96 w-4 text-black rotate-[60deg]"></div>
            <div className="absolute h-96 w-4 text-black rotate-[90deg]"></div>
            <div className="absolute h-96 w-4 text-black rotate-[120deg]"></div>
            <div className="absolute h-96 w-4 text-black rotate-[150deg]"></div> */}
          </div>
        </div>
      ) : (
        <div
          onClick={() => setActivated(!activated)}
          onBlur={() => setActivated(false)}
          className={`col-span-3 flex ${
            isRight ? "justify-self-center col-start-2 bg-action-blue " : "justify-self-center bg-action-red"
          } rounded-full w-36  h-36 justify-center  items-center drop-shadow-lg hover:brightness-110 hover:cursor-pointer border-white border-2`}
        >
          <span className="tracking-wider">Actions</span>
        </div>
      )}
    </>
  );
}
