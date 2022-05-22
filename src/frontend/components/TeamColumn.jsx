import React, { useEffect, useState } from "react";
import { sendAction } from "../actionHandlers";
import { useActionQueue } from "../hooks/customHooks";
import { actionInUse, allAgents, isActionClickable, isAgentClickable } from "../hooks/useSharedState";
import { ActionButton } from "./ActionButton";
import { ActiveAgentRow } from "./ActiveAgentRow";
import { RobotRow } from "./RobotRow";

function TeamColumn(props) {
  let isRight = props.position == "right";
  const [agentSelector, setAgentSelector] = useState({ active: false, actionName: "", agent: -1 });
  // const [clickableAgents, setClickableAgents] = isAgentClickable.useSharedState();
  // const [clickableActions, setClickableActions] = isActionClickable.useSharedState();
  const [selectedAction, setSelectedAction] = actionInUse.useSharedState();
  const [agents, setAgents] = allAgents.useSharedState();

  function agentOnClick(agent) {
    console.log(props.actions);
    if (selectedAction) {
      sendAction(
        selectedAction,
        // props.actions.find((a) => a.id == selectedAction),
        agent
      );
      setSelectedAction(null);
      setAgents(
        agents.map((a) => {
          a.selectable = true;
          return a;
        })
      );
      // sendAction(selectedAction.name
      //send the action
    } else {
      const ag = agents.find((a) => a.agentId == agent.agentId);
      ag.substitute = !ag.substitute;
      setAgents([...agents]);
    }
  }
  function changeKeeper(agent) {
    const oldKeepr = agents.find((a) => a.teamId == agent.teamId && a.isKeeper);
    oldKeepr.isKeeper = false;
    const newKeepr = agents.find((a) => a.agentId == agent.agentId);
    newKeepr.isKeeper = true;
    setAgents([...agents]);
  }

  function getRobots(color) {
    return agents
      .filter((a) => a.teamId == props.teamId)
      .map((a) => {
        return (
          <RobotRow
            selectionState={agentSelector.active}
            position={!props.isMobile && props.position}
            color={color}
            isMobile={props.isMobile}
            agent={a}
            key={a.agentId}
            disabled={!a.selectable}
            onKeeperClick={() => changeKeeper(a)}
            onClick={() => agentOnClick(a)}
          />
        );
      });
  }

  function actionOnClick(actionKey, teamId) {
    setAgents(
      agents.map((a) => {
        a.teamId == teamId ? (a.selectable = true) : (a.selectable = false);
        return a;
      })
    );
    if (selectedAction == actionKey) {
      setAgents(
        agents.map((a) => {
          a.selectable = true;
          return a;
        })
      );
      setSelectedAction(null);
    } else {
      setSelectedAction(actionKey);
    }
  }

  function getActions(color) {
    let actions = [];
    for (let i = 0; i < props.actions?.length || 0; i++) {
      let actionKey = `${props.teamId}_${props.actions[i].id}`;
      actions.push(
        <ActionButton
          actionName={props.actions[i].name}
          color={color}
          disabled={selectedAction && selectedAction != actionKey}
          onClick={() => actionOnClick(actionKey, props.teamId)}
          key={actionKey}
        />
      );
    }
    return actions;
  }

  if (props.isMobile) {
    return (
      <>
        <div className={`${props.teamId == 0 ? "left-0 " : " left-1/2"} z-10 w-1/2 absolute top-0 h-1 bg-action-blue `}></div>
        <div className={`w-full absolute top-0 h-1 bg-white z-0`}></div>
        <div className="p-6">
          <div className="grid grid-cols-3 mb-6 gap-y-4 gap-x-6 auto-rows-fr grid-rows-1 text-4xl">
            <ActionButton isMobile={true} color={"bg-pink-100 font-bold"} actionName="Timeout"></ActionButton>
            <ActionButton isMobile={true} color={"bg-pink-100 font-bold"} actionName="Global Game Stuck"></ActionButton>
            <div className="grid grid-rows-2 gap-2 font-semibold text-[#323232] text-4xl justify-end tracking-wider ">
              <div className="justify-self-end">
                <ActiveAgentRow teamId={props.teamId} isMobile={true} isKicking={props.isKicking} teamColor={props.teamColor} />
              </div>
              <div className="w-full">Penalties: 0</div>
            </div>
          </div>
          <div className="mb-12">
            <div className="grid grid-cols-2 auto-rows-fr gap-6 text-5xl font-bold">{getRobots("bg-pink-100")}</div>
          </div>
          <div className="overflow-scroll">
            <div className=" grid auto-cols-[32%] gap-4 grid-flow-col">{getActions("bg-pink-100")}</div>
          </div>
        </div>
      </>
    );
  } else
    return (
      <div className="grid grid-rows-[8] gap-0 items-center p-6 z-0 text-white w-full h-full">
        <div className="w-full justify-around border-separate row-span-1 ">
          <div className="flex items-center">
            {!isRight && (
              <div className="flex bg-action-red w-2/3 h-fit text-xl md:text-2xl lg:text-4xl rounded-md px-4 py-3">
                <span className=" text-center tracking-wider font-bold w-full">{props.teamName}</span>
              </div>
            )}
            <div className={`flex flex-1 ${isRight ? "justify-begin" : "justify-end"} items-center h-full`}>
              <button
                onClick={() => {}}
                className="bg-white relative text-black h-12 w-12 rounded-full font-extrabold items-center justify-center flex"
              >
                <div className="absolute w-1.5 h-1/2 rounded-xl bg-[#323232]"></div>
                <div className="absolute h-1.5 w-1/2 rounded-xl bg-[#323232]"></div>
              </button>
            </div>
            {isRight && (
              <div className="flex bg-action-blue w-2/3 h-fit  text-xl md:text-2xl lg:text-4xl rounded-md px-4 py-3">
                <span className=" text-center  tracking-wider font-bold w-full">{props.teamName}</span>
              </div>
            )}
          </div>
        </div>
        <ActiveAgentRow teamId={props.teamId} isRight={isRight} teamColor={props.teamColor} isKicking={props.isKicking}></ActiveAgentRow>
        <div className="grid grid-cols-3 gap-2 row-span-1 tracking-wider font-extrabold">
          <button
            onClick={() => {
              console.log(`${props.teamId} Timeout`);
            }}
            className={`col-span-1 relative w-full h-12 rounded-md p-1 ${isRight ? " bg-action-blue" : " bg-action-red"}`}
          >
            <div className="absolute w-6 h-6 top-0 left-0 translate-x-[-50%] translate-y-[-50%] text-black ring-4 ring-green-300 bg-white rounded-full">
              1
            </div>
            Timeout
          </button>
          <button
            onClick={() => {
              console.log(`${props.teamId} Retake`);
            }}
            className={`col-span-1 w-full h-12 rounded-md p-1 ${isRight ? "bg-action-blue" : "bg-action-red"}`}
          >
            Retake
          </button>
          <button
            onClick={() => {
              console.log(`${props.teamId} Abort`);
            }}
            className={`col-span-1 w-full h-12 rounded-md p-1 ${isRight ? "bg-action-blue" : "bg-action-red"}`}
          >
            Abort
          </button>
        </div>

        <div className={`grid h-full  grid-flow-row w-3/4 row-span-3 ${isRight && "place-self-end"} items-center `}>
          {getRobots(isRight ? "bg-action-blue" : "bg-action-red")}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center row-span-1">{getActions(isRight ? "bg-action-blue" : "bg-action-red")}</div>
      </div>
    );
}

export default TeamColumn;
