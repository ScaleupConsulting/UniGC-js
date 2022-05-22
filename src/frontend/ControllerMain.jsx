import React, { useEffect, useState } from "react";
import { getGameActionButtons } from "./components/ActionButton";
import CenterControlPanel from "./components/CenterControlPanel";
import Score from "./components/ScoreBoard";
import TeamColumn from "./components/TeamColumn";
import { TeamInfoCol } from "./components/TeamInfoCol_Mobile";
import { StateInfo, Timer } from "./components/Timer";
import { UndoQueue } from "./components/UndoQueue";
import { useGameState } from "./hooks/customHooks";
import { allAgents, teamActiveAgent } from "./hooks/useSharedState";
import { ws } from "./socketHandler";

let initialState = {
  teams: [],
  actionList: [],
};

function ControllerMain() {
  const [gameTime, setGameTime] = useState(0);

  const [initialSetup, setInitialSetup] = useState(initialState);
  const [gameState, setGameState] = useGameState();
  // const [selectedAction, setSelectedAction] = useState();
  const [activeAgent, setActiveAgent] = teamActiveAgent.useSharedState();
  const [activeTeam, setActiveTeam] = useState(1);
  const [agents, setAgents] = allAgents.useSharedState();

  useEffect(() => {
    // ws.onmessage = (e: any) => {};
    // ws.current = new WebSocket("ws://127.0.0.1:3002");
    ws.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data && data.type) {
        switch (data.type) {
          case "c_time":
            setGameTime(Number(data.value));
            break;
          case "setup":
            console.log(data);

            setInitialSetup(data.data.game);
            setActiveAgent(agents[2]);
            break;
          case "stateUpdate":
            setGameState(data.value);

            setAgents(
              agents.map((a) => {
                a.penalized = Math.random() > 0.5;
                return a;
              })
            );
            // if (data.value.agents) {

            //   //to set agent state changes
            // }
            break;
        }
      }
    };
    return () => {
      // ws.current?.close();
    };
  }, [ws]);

  const allActions = {
    penaltyActions: [
      { id: "pushing", actionName: "Pushing" },
      { id: "foul", actionName: "Foul" },
      { id: "fall_inact", actionName: "Fallen / Inactive" },
      { id: "leaving", actionName: "Leaving The Field" },
      { id: "illegal_def", actionName: "Illegal Defender" },
      { id: "ball_hold_hands", actionName: "Ball Holding / Hands" },
      { id: "kickoff_goal", actionName: "Kickoff Goal" },
      { id: "pickup", actionName: "Pickup" },
      { actionName: "More Buttons" },
    ],
    teamActions: [
      { id: "gk", name: "Goal Kick", legal: true, selectable: true },
      { id: "dfk", name: "Direct Free Kick", legal: true, selectable: true },
      { id: "ck", name: "Corner Kick", legal: true, selectable: true },
      { id: "pk", name: "Penalty Kick", legal: true, selectable: true },
      { id: "ifk", name: "Indirect Free Kick", legal: true, selectable: true },
      { id: "ti", name: "Throw-In", legal: true, selectable: true },
    ],
  };

  const [isMobile, setIsMobile] = useState(false);

  if (initialSetup.teams.length) {
    if (isMobile) {
      return (
        <div className="grid auto-rows-min gap-4 mobile p-12 text-white max-h-screen grid-cols-1 border w-full justify-center ">
          <section id="game_info_panel" className=" grid grid-cols-3  w-full mb-12">
            <TeamInfoCol
              teamId={0}
              isMobile={true}
              position="left"
              teamName={initialSetup.teams[0].name}
              teamColor={initialSetup.teams[0].color}
            ></TeamInfoCol>
            <div className=" w-full col-span-1 items-center justify-center grid grid-rows-2 grid-cols-1">
              <Score isMobile={true}></Score>
              <div className="row-span-1 mt-16 mb-12">
                <Timer isMobile={true} time={gameTime}></Timer>
              </div>
            </div>
            <TeamInfoCol
              teamId={1}
              isMobile={true}
              position="right"
              teamName={initialSetup.teams[1].name}
              teamColor={initialSetup.teams[1].color}
            ></TeamInfoCol>
          </section>
          <section id="StateTimer" className="tracking-wide text-6xl my-6">
            <StateInfo isMobile={isMobile} time={gameTime}></StateInfo>
          </section>
          <section id="GameActions" className="grid grid-cols-3 auto-rows-fr gap-x-6 gap-y-4 grid-rows-3 text-4xl">
            {getGameActionButtons(allActions.penaltyActions, 8, () => {})}
          </section>
          <section id="team_panel" className="h-full  rounded-[2rem] mt-6 drop-shadow-xl shadow-lg">
            <div id="team_names" className="text-6xl flex justify-between px-4 py-8 text-action-blue items-center">
              <div
                onClick={() => {
                  setActiveTeam(0);
                }}
                className="w-full text-center"
              >
                {initialSetup.teams[0].name}
              </div>
              <div
                onClick={() => {
                  setActiveTeam(1);
                }}
                className=" w-full text-center"
              >
                {initialSetup.teams[1].name}
              </div>
            </div>
            <div id="team_details" className="relative pt-4 text-[#323232] mx-1 ">
              {activeTeam == 0 ? (
                <TeamColumn
                  actions={allActions.teamActions}
                  isMobile={true}
                  // numRobots={6}
                  agentState={gameState.agents}
                  isKicking={gameState.kicking_teamId == 0}
                  teamName={initialSetup.teams[0].name}
                  teamId={0}
                  teamColor={initialSetup.teams[0].color}
                ></TeamColumn>
              ) : (
                <TeamColumn
                  actions={allActions.teamActions}
                  isMobile={true}
                  // numRobots={6}
                  teamName={initialSetup.teams[1].name}
                  agentState={gameState.agents}
                  isKicking={gameState.kicking_teamId == 1}
                  teamId={1}
                  teamColor={initialSetup.teams[1].color}
                ></TeamColumn>
              )}
            </div>
          </section>
          <section id="undo_queue" className="h-full mt-12 w-full bg">
            <UndoQueue isMobile={true} undoQueue={initialSetup.actionList}></UndoQueue>
          </section>
        </div>
      );
    } else {
      return (
        <div className="grid h-full grid-cols-5 p-4 unselectable justify-between" key={"none"}>
          <section id="team_col_left" className="col-span-2">
            <TeamColumn
              position="left"
              // numRobots={6}
              isKicking={gameState.kicking_teamId == 0 ? true : false}
              actions={allActions.teamActions}
              teamId={0}
              teamName={initialSetup.teams[0].name}
              teamColor={initialSetup.teams[0].color}
              agentState={gameState.agents}
            ></TeamColumn>
          </section>
          <section id="center-control-panel" className="col-span-1 h-full ">
            <div className="h-full items-center  justify-center gap-6 grid grid-rows-6  grid-cols-1 max-w-full">
              <Score teams={initialSetup.teams}></Score>
              <Timer time={gameTime}></Timer>
              <CenterControlPanel penaltyActions={allActions.penaltyActions} stateTimer={gameTime}></CenterControlPanel>
            </div>
          </section>
          <section id="team_col_right" className="col-span-2">
            <TeamColumn
              position="right"
              // numRobots={6}
              isKicking={gameState.kicking_teamId == 1 ? true : false}
              actions={allActions.teamActions}
              teamId={1}
              teamName={initialSetup.teams[1].name}
              teamColor={initialSetup.teams[1].color}
              agentState={gameState.agents}
            ></TeamColumn>
          </section>
        </div>
      );
    }
  }
}

export default ControllerMain;
