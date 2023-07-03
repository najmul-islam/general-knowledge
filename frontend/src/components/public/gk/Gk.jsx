import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Gk = ({ gk }) => {
  if (gk?.question) {
    return (
      <Card body key={gk._id} className="my-2">
        <Card.Subtitle className="my-1">
          প্রঃ {gk.question} {gk.question.includes("?") ? null : "?"}
        </Card.Subtitle>
        <Card.Text>
          উঃ {gk.answer} {gk.answer.includes("।") ? null : "।"}
        </Card.Text>
      </Card>
    );
  }

  // if (gk.qna) {
  //   return (
  //     <Card body className="my-1">
  //       <Card.Subtitle className="">
  //         {gk.qna} {gk.qna.includes("।") ? null : "।"}
  //       </Card.Subtitle>
  //     </Card>
  //   );
  // }
};

export default Gk;
