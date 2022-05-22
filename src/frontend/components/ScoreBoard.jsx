import React from "react";

function Score(props) {
  return (
    <div className="row-span-1 flex justify-center">
      <div className={`${props.isMobile ? "text-5xl" : "md:text-2xl lg:text-5xl"}  relative rounded-full text-white`}>
        <span>
          0 - 0
          {/* {props.teams[0]?.score} - {props.teams[1]?.score} */}
        </span>
      </div>
    </div>
  );
}

export default Score;
