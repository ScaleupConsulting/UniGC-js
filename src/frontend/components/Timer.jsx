import React, { useEffect, useState } from "react";
import { ws } from "../socketHandler";

function getMinutesSeconds(miliseconds) {
  let mins = Math.floor(miliseconds / 60);
  let hours = Math.floor(mins / 60);
  if (hours) {
    mins = mins % 60;
  }
  let secs = Math.floor(miliseconds % 60);

  return {
    hours: hours,
    mins: mins < 10 ? "0" + mins : mins,
    secs: secs < 10 ? "0" + secs : secs,
  };
}

export function Timer(props) {
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    ws.addEventListener("message", (e) => {
      let data = JSON.parse(e.data);
      if (data && data.type) {
        switch (data.type) {
          case "c_time":
            setGameTime(Number(data.value));
            break;
        }
      }
    });
  }, []);

  let { hours, mins, secs } = getMinutesSeconds(gameTime);

  return (
    <div id="game_time" className="row-span-1 relative flex justify-center ">
      <div
        className={`${
          props.isMobile ? "text-5xl" : "text-xl md:text-3xl lg:text-4xl xl:text-5xl"
        } rounded-full text-white`}
      >
        <div
          className={`drop-shadow-md bg-[#373e42] -z-10 border-slate-100 lg:blur-[1px] rounded-full border-4 ${
            props.isMobile ? "p-[40%] blur-sm " : "p-[40%]  2xl:p-[30%]"
          } absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}
        ></div>
        <div
          className={`rounded-full blur-md -z-10 bg-black bg-opacity-30 ${
            props.isMobile ? "w-[100vw] h-[100vw]" : "w-[75vw] h-[75vw]"
          }  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}
        ></div>
        <span className="tracking-wide opacity-80">
          {hours ? hours + ":" : ""} {mins} : {secs}
        </span>
      </div>
    </div>
  );
}

export function StateInfo(props) {
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    ws.addEventListener("message", (e) => {
      let data = JSON.parse(e.data);
      if (data && data.type) {
        switch (data.type) {
          case "c_time":
            setGameTime(Number(data.value));
            break;
        }
      }
    });
  }, []);

  let { mins, secs } = getMinutesSeconds(gameTime);
  if (props.isMobile)
    return (
      <>
        <div id="state_time" className="flex justify-center content-center">
          {mins}
          <span className="text-4xl self-end mr-6">m</span>
          {secs} <span className="text-4xl self-end">s</span>
        </div>
        <div id="state_desc" className="flex text-5xl mt-2">
          <span className="text-action-blue w-full  content-center text-center font-medium">
            {props.state || "Ready"}
          </span>
        </div>
      </>
    );
  else
    return (
      <div className="row-span-1 pt-5 pb-1 grid auto-rows-max justify-center text-4xl tracking-wide self-end">
        <div className="flex">
          {mins}
          <span className="text-sm  place-self-end mr-2">m</span>
          {secs} <span className="text-sm  place-self-end">s</span>
        </div>
        <span className="text-action-blue  text-center font-medium  text-[1.4rem]">{props.state || "Ready"}</span>
      </div>
    );
}
