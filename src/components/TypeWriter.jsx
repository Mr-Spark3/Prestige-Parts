import React, { useState, useEffect } from "react";

function Typewriter({ words, loop, delaySpeed }) {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [lastWordIndex, setLastWordIndex] = useState(-1);

  useEffect(() => {
    let currentIndex = index;
    let interval;

    if (currentIndex < words.length) {
      interval = setInterval(() => {
        const currentWord = words[currentIndex];
        const currentLength = displayedText.length;
        if (currentLength < currentWord.length) {
          setDisplayedText((prev) => prev + currentWord[currentLength]);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayedText("");
            let nextIndex = (currentIndex + 1) % words.length;
            if (nextIndex === lastWordIndex) {
              nextIndex = (nextIndex + 1) % words.length;
            }
            setIndex(nextIndex);
            if (!loop && nextIndex === 0) {
              setLastWordIndex(-1);
            } else {
              setLastWordIndex(currentIndex);
            }
          }, delaySpeed);
        }
      }, 75);
    }

    return () => clearInterval(interval);
  }, [index, displayedText, words, loop, delaySpeed, lastWordIndex]);

  return <span>{displayedText}</span>;
}

export default Typewriter;