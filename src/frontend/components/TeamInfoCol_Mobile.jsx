import React from "react";
import { teamActiveAgent } from "../hooks/useSharedState";
import { ActiveAgent, PenaltyQueue } from "./PenaltyQueue";

export function TeamInfoCol(props) {
  return (
    <div className=" w-full col-span-1 items-center grid grid-rows-2  grid-cols-1">
      <div className="w-full flex  items-center  justify-between p-1 row-span-1">
        {props.position == "left" ? (
          <>
            <div
              style={{ color: props.teamColor }}
              className={`text-5xl p-2 rounded-lg font-bold text-center justify-center flex flex-1`}
            >
              {props.teamName}
            </div>
            <button className="bg-white relative ml-4 text-black h-14 w-14 rounded-full font-extrabold items-center justify-center flex">
              <div className="absolute w-1 h-1/2 rounded-xl bg-[#323232]"></div>
              <div className="absolute h-1 w-1/2 rounded-xl bg-[#323232]"></div>
            </button>
          </>
        ) : (
          <>
            <button className="bg-white relative text-black h-14 w-14 rounded-full font-extrabold items-center justify-center flex">
              <div className="absolute w-1 h-1/2 rounded-xl bg-[#323232]"></div>
              <div className="absolute h-1 w-1/2 rounded-xl bg-[#323232]"></div>
            </button>
            <div
              style={{ color: props.teamColor }}
              className="text-5xl ml-4 p-2 rounded-lg font-bold text-center justify-center flex flex-1"
            >
              {props.teamName}
            </div>
          </>
        )}
      </div>
      <div className="w-full">
        <PenaltyQueue teamId={props.teamId} isMobile={props.isMobile} teamColor={props.teamColor}></PenaltyQueue>
      </div>
      <div className="w-full "></div>
    </div>
  );
}
