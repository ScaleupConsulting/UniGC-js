/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

const isSSR = typeof window === "undefined";

const EventTarget = isSSR ? Object : window.EventTarget;
export class SharedStateTarget extends EventTarget {
  constructor(initialStateOfNewComponents) {
    super();
    this.initialStateOfNewComponents = initialStateOfNewComponents;
  }

  useSharedState() {
    const [state, setState] = useState(this.initialStateOfNewComponents);
    const setSharedState = (detail) => super.dispatchEvent(new CustomEvent("set", { detail }));

    useEffect(() => {
      const eventListener = ({ detail }) => setState((this.initialStateOfNewComponents = detail));

      super.addEventListener("set", eventListener);
      return () => super.removeEventListener("set", eventListener);
    }, []);

    return [state, setSharedState];
  }
}
const tempAllAgents = [
  { agentId: "0_1", name: "M1", teamId: 0, selectable: true, substitute: false },
  { agentId: "0_2", name: "M2", teamId: 0, selectable: true, substitute: false },
  { agentId: "0_3", name: "M3", teamId: 0, selectable: true, substitute: false, isKeeper: true },
  { agentId: "0_4", name: "M4", teamId: 0, selectable: true, substitute: false },
  { agentId: "0_5", name: "M5", teamId: 0, selectable: true, substitute: false },
  { agentId: "0_6", name: "M6", teamId: 0, selectable: true, substitute: false },
  { agentId: "1_1", name: "T1", teamId: 1, selectable: true, substitute: false, penalized: true },
  { agentId: "1_2", name: "T2", teamId: 1, selectable: true, substitute: false },
  { agentId: "1_3", name: "T3", teamId: 1, selectable: true, substitute: false },
  { agentId: "1_4", name: "T4", teamId: 1, selectable: true, substitute: false },
  { agentId: "1_5", name: "T5", teamId: 1, selectable: true, substitute: false },
  { agentId: "1_6", name: "T6", teamId: 1, selectable: true, substitute: false, isKeeper: true },
];

export const actionInUse = new SharedStateTarget(null);
export const allAgents = new SharedStateTarget(tempAllAgents);
// export const isAgentClickable = new SharedStateTarget([]);
// export const isActionClickable = new SharedStateTarget([]); //should also check for legal actions
export const teamActiveAgent = new SharedStateTarget(null);
// export const currentGameState = new SharedStateTarget([]);
