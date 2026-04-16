import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppProvider";
import { CircleCheck, CircleX } from "lucide-react";

export default function Feedback() {
  const { result, setResult, message, setMessage } = useApp();
  const [display, setDisplay] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleFeedback = () => {
      if (!result && !message) {
        setDisplay(false);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDisplay(false);
        setResult(null);
        setMessage("");
      }, 3000);

      setDisplay(true);
    };

    handleFeedback();

    return () => clearTimeout(timeoutRef.current);
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!display) return null;

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <DotLottieReact
          className={result === "error" ? "w-40 h-auto" : "w-60 h-60"}
          src={result === "error" ? "/failed.lottie" : "/success.lottie"}
          speed="1"
          autoplay
        />
      </div>

      <div
        role="alert"
        className={`alert ${result === "error" ? "alert-error" : "alert-success"} fixed top-2 right-2 z-50`}
      >
        {result === "error" ? <CircleX size={24} /> : <CircleCheck size={24} />}
        <span>{message}</span>
      </div>
    </>
  );
}
