import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import CloseIcon from "@/assets/svgs/close.svg?react";
import QuestionIcon from "@/assets/svgs/whiteboard/question.svg?react";

import Header from "@/components/Header/Header";
import LogContainer from "@/components/LogContainer/LogContainer";
import LogToggleButton from "@/components/Button/LogToggleButton";

import videoRefState from "../Test/components/stateVideoRef";
import isQuestionLogOpenState from "@/stores/stateIsQuestionLogOpen";

const Participant = () => {
  const setVideoRef = useSetRecoilState(videoRefState);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isQuestionLogOpen = useRecoilValue(isQuestionLogOpenState);
  useEffect(() => {
    setVideoRef(videoRef);
  }, []);

  return (
    <>
      <Header type="participant" />
      <section className="relative">
        <video className="w-[100vw] h-[calc(100vh-5rem)]" autoPlay muted ref={videoRef}></video>
        <LogContainer
          type="question"
          className={`absolute top-2.5 right-2.5 ${isQuestionLogOpen ? "block" : "hidden"}`}
        />
        <LogToggleButton className="absolute top-2.5 right-2.5">
          {isQuestionLogOpen ? <CloseIcon /> : <QuestionIcon fill="black" />}
        </LogToggleButton>
      </section>
    </>
  );
};

export default Participant;
