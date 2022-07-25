import React, { useEffect, useState } from "react";
import { getGameActionButtons } from "./components/ActionButton";
import CenterControlPanel from "./components/CenterControlPanel";
import Score from "./components/ScoreBoard";
import TeamColumn from "./components/TeamColumn";
import { TeamInfoCol } from "./components/TeamInfoCol_Mobile";
import { StateInfo, Timer } from "./components/Timer";
import { UndoQueue } from "./components/UndoQueue";
import { useGameState } from "./hooks/customHooks";
import { allAgents, penaltyQueue, teamActiveAgent } from "./hooks/useSharedState";
import { ws } from "./socketHandler";

let initialState = {
  teams: [],
  actionList: [],
};

function MainMobileLayout(props) {
  const { teams, actions, gameState, undoQueue, activeTeam } = props;
  return (
    <div className="grid auto-rows-min gap-4 mobile p-12 text-white max-h-screen h-full grid-cols-1 border w-full justify-center ">
      <section id="game_info_panel" className=" grid grid-cols-3  w-full mb-12">
        <TeamInfoCol
          teamId={0}
          isMobile={true}
          position="left"
          teamName={teams[0]?.name}
          teamColor={teams[0]?.color}
        ></TeamInfoCol>
        <div className=" w-full col-span-1 items-center justify-center grid grid-rows-2 grid-cols-1">
          <Score teams={teams} isMobile={true}></Score>
          <div className="row-span-1 mt-16 mb-12">
            <Timer isMobile={true}></Timer>
          </div>
        </div>
        <TeamInfoCol
          teamId={1}
          isMobile={true}
          position="right"
          teamName={teams[1].name}
          teamColor={teams[1].color}
        ></TeamInfoCol>
      </section>
      <section id="StateTimer" className="tracking-wide text-6xl my-6">
        <StateInfo isMobile={true}></StateInfo>
      </section>
      <section id="GameActions" className="grid grid-cols-3 auto-rows-fr gap-x-6 gap-y-4 grid-rows-3 text-4xl">
        {getGameActionButtons(actions.penaltyActions, 8, () => {})}
      </section>
      <section
        id="team_panel"
        style={{ backgroundColor: teams[activeTeam].color, color: "white" }}
        className="h-full  rounded-[2rem] mt-6 drop-shadow-xl shadow-lg"
      >
        <div id="team_names" className="text-6xl flex justify-between px-4 py-8 text-white items-center">
          <div
            onClick={() => {
              setActiveTeam(0);
            }}
            className="w-full text-center"
          >
            {teams[0].name}
          </div>
          <div
            onClick={() => {
              setActiveTeam(1);
            }}
            className=" w-full text-center"
          >
            {teams[1].name}
          </div>
        </div>
        <div id="team_details" className="relative pt-4 text-[#323232] mx-1 ">
          {activeTeam == 0 ? (
            <TeamColumn
              actions={actions.teamActions}
              isMobile={true}
              agentState={gameState.agents}
              isKicking={gameState.kicking_teamId == 0}
              team={teams[0]}
              otherTeamColor={teams[1].color}
              teamId={0}
            ></TeamColumn>
          ) : (
            <TeamColumn
              actions={actions.teamActions}
              isMobile={true}
              team={teams[1]}
              agentState={gameState.agents}
              isKicking={gameState.kicking_teamId == 1}
              otherTeamColor={teams[0].color}
              teamId={1}
            ></TeamColumn>
          )}
        </div>
      </section>
      <section id="undo_queue" className="h-full mt-12 w-full bg">
        <UndoQueue isMobile={true} undoQueue={undoQueue}></UndoQueue>
      </section>
    </div>
  );
}

function MainLayout(props) {
  const { teams, actions, gameState, undoQueue } = props;
  return (
    <div className="grid h-full grid-cols-5 p-4 unselectable justify-between" key={"none"}>
      <section id="team_col_left" className="col-span-2">
        <TeamColumn
          position="left"
          // numRobots={6}
          isKicking={gameState?.kicking_teamId == 0 ? true : false}
          actions={actions.teamActions}
          teamId={0}
          teamName={teams[0]?.name}
          teamColor={teams[0]?.color}
          agentState={gameState?.agents}
        ></TeamColumn>
      </section>
      <section id="center-control-panel" className="col-span-1 h-full ">
        <div className="h-full items-center  justify-center gap-6 grid grid-rows-6  grid-cols-1 max-w-full">
          <Score teams={teams}></Score>
          <Timer></Timer>
          <CenterControlPanel penaltyActions={actions.penaltyActions}></CenterControlPanel>
        </div>
      </section>
      <section id="team_col_right" className="col-span-2">
        <TeamColumn
          position="right"
          // numRobots={6}
          isKicking={gameState.kicking_teamId == 1 ? true : false}
          actions={actions.teamActions}
          teamId={1}
          teamName={teams[1].name}
          teamColor={teams[1].color}
          agentState={gameState.agents}
        ></TeamColumn>
      </section>
    </div>
  );
}
function ControllerMain() {
  const [initialSetup, setInitialSetup] = useState(initialState);
  const [gameState, setGameState] = useGameState();
  const [activeTeam, setActiveTeam] = useState(1);
  const [agents, setAgents] = allAgents.useSharedState();
  const [penaltyQ, setPenaltyQ] = penaltyQueue.useSharedState();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    ws.onmessage = (e) => {
      let message = JSON.parse(e.data);
      if (message && message.type) {
        switch (message.type) {
          // case "c_time":
          //   setGameTime(Number(data.value));
          //   break;
          case "setup":
            console.log(message);

            setInitialSetup(message.data);
            break;
          case "stateUpdate":
            setGameState(message.value);

            setAgents(
              agents.map((a) => {
                a.penalized = Math.random() > 0.5;
                return a;
              })
            );
            setPenaltyQ(agents.filter((_) => _.penalized));
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

  if (initialSetup.teams.length) {
    if (isMobile) {
      return (
        <MainMobileLayout
          teams={initialSetup?.teams}
          actions={allActions}
          undoQueue={initialSetup?.actionList}
          activeTeam={activeTeam}
          gameState={gameState}
        ></MainMobileLayout>
      );
    } else {
      return (
        <MainLayout
          teams={initialSetup?.teams}
          actions={allActions}
          activeTeam={activeTeam}
          gameState={gameState}
        ></MainLayout>
      );
    }
  }
}

export default ControllerMain;
