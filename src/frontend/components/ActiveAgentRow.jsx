import React from "react";
import { teamActiveAgent } from "../hooks/useSharedState";

export const ActiveAgent = (props) => {
  let [activeAgent] = teamActiveAgent.useSharedState();
  let { teamColor } = props;
  if (activeAgent.teamId == props.teamId) {
    if (props.isMobile) {
      return (
        <div
          style={{ backgroundColor: teamColor }}
          className={` text-white h-[50%] lg:h-[75%] text-5xl px-3  lg:px-6 py-4 rounded-xl justify-center flex `}
        >
          {activeAgent.name}
          <span className="text-3xl place-self-center tracking-wider mx-2">(44s)</span>
          {props.children}
        </div>
      );
    } else
      return (
        <div
          style={{ backgroundColor: teamColor }}
          className={` text-white h-[50%] lg:h-[75%] text-xl px-3  lg:px-6 py-2 lg:py-2 rounded-xl  self-center items-center flex `}
        >
          {activeAgent.name}
          <span className="text-xs tracking-wider">
            <sup>(44s)</sup>
          </span>
          {props.children}
        </div>
      );
  } else {
    return <div></div>;
  }
};
export const ActiveAgentRow = (props) => {
  if (props.isMobile) {
    return (
      <div className="flex items-center justify-end">
        <div className="p-[10%] ring-2 mx-4 ring-white rounded-full relative">
          {props.isKicking && (
            <div
              style={{ backgroundColor: props.teamColor }}
              className={`p-[40%] drop-shadow-md  top-1/2 left-1/2  rounded-full translate-x-[-50%] translate-y-[-50%] absolute`}
            ></div>
          )}
        </div>
        <span className="h-auto self-auto ">Kicking</span>
      </div>
    );
  } else
    return (
      <div className={`flex w-2/3 justify-between min-w-min h-full row-span-1 ${props.isRight ? "justify-self-end  place-content-end" : ""}`}>
        {props.isRight ? <ActiveAgent teamId={props.teamId} teamColor={props.teamColor} /> : ""}
        <div className="text-white text-xl md:text-2xl lg:text-3xl flex items-center mx-2">
          {props.isRight && <span className="h-auto self-auto px-2">Kicking</span>}
          <div className="w-8 h-8 ring-2 ring-white rounded-full relative">
            {props.isKicking && (
              <div
                style={{ backgroundColor: props.teamColor }}
                className={`w-6 h-6 drop-shadow-md  top-1/2 left-1/2  rounded-full translate-x-[-50%] translate-y-[-50%] absolute`}
              ></div>
            )}
          </div>
          {!props.isRight && <span className="h-auto px-2">Kicking</span>}
        </div>
        {!props.isRight ? <ActiveAgent teamId={props.teamId} teamColor={props.teamColor} /> : ""}
      </div>
    );
};
