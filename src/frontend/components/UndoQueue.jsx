import React from "react";
import { ActionButton } from "./ActionButton";

let tempUndoQueue = ["testAction1", "testAction2", "testAction3", "testAction4", "testAction5"];

export function getUndoQueue(undoQueue, color) {
  let actions = [];
  for (let i = 0; i < undoQueue.length; i++) {
    actions.push(<ActionButton actionName={undoQueue[i]} color={color} key={"undo_" + i} />);
  }
  return actions;
}

export function UndoQueue(props) {
  return (
    <>
      <div className="py-6 justify-center md:py-3 rounded-[2rem] md:rounded-xl flex z-30 bg-slate-900 bg-opacity-25 items-center ring-2 ring-white ring-opacity-25 ">
        <button className=" mx-3 text-action-blue text-5xl  md:text-lg  font-extrabold ">{"<"}</button>
        <div className=" overflow-x-scroll max-w-full rounded-lg items-center justify-center">
          <div className="grid auto-cols-[32%] md:auto-cols-[50%] lg:auto-cols-[32%] xl:auto-cols-[24%] gap-4 md:gap-2 grid-flow-col ">{getUndoQueue(tempUndoQueue, "bg-action-blue")}</div>
        </div>
        <button className="mx-3 text-action-blue text-5xl md:text-lg font-extrabold ">{">"}</button>
      </div>
    </>
  );
}
