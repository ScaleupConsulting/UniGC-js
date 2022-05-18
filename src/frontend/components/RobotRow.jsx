import React from "react";
import { allAgents } from "../hooks/useSharedState";
const image = require("../assets/robot.png");
const gloves = require("../assets/gloves.svg");
const glovesSrc = gloves.default;
const imageSrc = image.default;

export const RobotRow = (props) => {
  let state = {};
  if (props.isMobile) {
    return (
      <div
        onClick={(event) => {
          event.preventDefault();
          props.onClick();
        }}
        className={`w-full relative cursor-pointer hover:brightness-75 overflow-hidden ${(props.disabled && "disabled") || ""}
       z-40 agent rounded-xl p-3 ${props.color} flex justify-between`}
      >
        {props.agent?.penalized && (
          <div className={`absolute penalty-progressbar bg-clip-padding z-20 w-full bg-yellow-500 h-[100%] top-0 left-0 `}></div>
        )}

        <div className="h-full w-fit align-middle z-30  flex items-center tracking-wide">
          <img src={imageSrc} className={`block object-cover h-full`} alt="robby" />
          <span className="p-3">{`${props.agent.name}`}</span>
        </div>
      </div>
    );
  } else
    return (
      <div
        onClick={(event) => {
          event.preventDefault();
          props.onClick();
        }}
        className={`w-full  relative cursor-pointer hover:brightness-75 overflow-hidden ${(props.disabled && "disabled") || ""}
         z-40 agent rounded-md py-2 pl-2 pr-4 
        ${props.color} flex justify-between`}
      >
        {props.agent?.penalized && (
          <div className={`absolute penalty-progressbar bg-clip-padding z-20 w-full bg-yellow-400 h-[10%] top-0 left-0 `}></div>
        )}

        <div className="h-fit w-fit align-middle z-30 flex items-center tracking-widest">
          <img src={imageSrc} className={`${props.isMobile ? "" : "hidden"} lg:block`} alt="robby" />
          <span>{`${props.agent.name}  ${props.agent.substitute ? "(sub)" : ""}`}</span>
        </div>
        {!props.isMobile && (
          <div className="flex  gap-1 text-[#323232]  ">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="z-40  w- self-center rounded-md h-full  text-md md:text-lg lg:text-xl font-medium my-1.5 px-1"
            >
              {props.agent.isKeeper ? (
                <img className="object-cover " src={glovesSrc}></img>
              ) : (
                <img className="object-cover opacity-25" onClick={() => props.onKeeperClick()} src={glovesSrc}></img>
              )}
            </button>
            <button className="w-fit z-20 h-auto rounded-md border text-md md:text-lg lg:text-xl font-medium my-1.5 px-2 bg-card-pink">0</button>
            <button className="w-fit z-20 h-auto rounded-md border text-md md:text-lg lg:text-xl font-medium my-1.5 px-2 bg-card-yellow">0</button>
            <button className="w-fit z-20 h-auto rounded-md border text-md md:text-lg lg:text-xl font-medium my-1.5 px-2 bg-card-blue">0</button>
          </div>
        )}
      </div>
    );
};
