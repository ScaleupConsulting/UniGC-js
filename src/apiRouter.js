import express from "express";

const router = express.Router();

import actionList from "./actionDefs";

router.post("/action/:actionName", (req, res) => {
  console.log(req.params);
  if (req.params && req.params.actionName) {
    const action = actionList.find((ar) => ar.actionName.toLowerCase() == req.params.actionName);
    if (action) {
      action.actionDef({ team: req.query.teamId?.toString() }, req.body.args);
    }
  }
  res.send();
});

// router.get("/setup", (req, res) => {
//   res.send({
//     game: {
//       teams: [
//         {
//           name: "Team 1",
//           color: "#22222",
//         },
//         {
//           name: "Team 2",
//           color: "#44444",
//         },
//       ],
//     },
//   });
// });
export default router;
