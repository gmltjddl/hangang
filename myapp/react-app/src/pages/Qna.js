import React, { useState, useEffect } from "react";
import axios from "axios";
import Qnawrite from "../component/Qna/Qnawrite";
import Qnalist from "../component/Qna/Qnalist";
const Qna = () => {
 

  return (

    <div>
      <Qnawrite />
      <Qnalist />

    </div>
  );
}
export default Qna;