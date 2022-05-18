import React from "react";
import { useActionQueue } from "../hooks/customHooks";
import { actionInUse } from "../hooks/useSharedState";
import { ActionButton } from "./ActionButton";
import { StateInfo } from "./Timer";
import { getUndoQueue, UndoQueue } from "./UndoQueue";

function CenterControlPanel({ penaltyActions, stateTimer }) {
  // const [undoQueue, setUndoQueue] = useActionQueue();
  const [selectedAction, setSelectedAction] = actionInUse.useSharedState();

  function getGameActionButtons(maxButtons, onClick, isMobile = false) {
    let _actions = [];
    penaltyActions.forEach((a, i) => {
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
            onClick={() => {
              setSelectedAction(a);
            }}
            key={"center_" + a.actionName}
          ></ActionButton>
        );
      }
    });
    return _actions;
  }

  return (
    <div className="row-span-3 grid grid-rows-4 text-white gap-0 h-full grid-cols-1 justify-center items-center self-end  mb-3">
      <div className=" row-span-2 grid grid-cols-1 auto-rows-min content-end rounded-xl  justify-center  p-2  justify-self-center h-full w-[175%]">
        <StateInfo time={stateTimer}></StateInfo>
      </div>
      <div className="row-span-1 justify-center text-4xl gap-2 tracking-wide grid grid-cols-2 justify-self-center place-self-end w-[175%]">
        {getGameActionButtons(3, () => {})}
      </div>
      <div className="row-span-1 z-40 self-end w-[175%] h-fit justify-self-center ">
        <UndoQueue></UndoQueue>
      </div>
    </div>
  );
}

export default CenterControlPanel;
