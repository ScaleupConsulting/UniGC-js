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
      <div className="justify-center py-1 rounded-[2rem] md:rounded-xl flex z-30 bg-slate-900 bg-opacity-25 items-center ring-2 ring-white ring-opacity-25 ">
        {!props.isMobile && (
          <button
            onClick={() => {
              document.querySelector("#undoQueue").scrollBy(-50, 0);
            }}
            className=" px-2 mx-1 py-1 rounded-lg  text-action-blue text-5xl  md:text-lg  font-extrabold "
          >
            {"<"}
          </button>
        )}

        <div id="undoQueue" className=" py-1 overflow-x-scroll max-w-full rounded-lg items-center justify-center">
          <div
            className={`grid ${
              props.isMobile
                ? "px-4  py-1 gap-4 auto-cols-[32%] "
                : "auto-cols-[32%] md:auto-cols-[50%] lg:auto-cols-[32%] xl:auto-cols-[24%] px-1 gap-4 md:gap-2"
            }  grid-flow-col`}
          >
            {getUndoQueue(tempUndoQueue, "bg-action-blue")}
          </div>
        </div>
        {!props.isMobile && (
          <button
            onClick={() => {
              document.querySelector("#undoQueue").scrollBy(50, 0);
            }}
            className="px-2 mx-1 py-1 rounded-lg text-action-blue text-5xl md:text-lg font-extrabold "
          >
            {">"}
          </button>
        )}
      </div>
    </>
  );
}
