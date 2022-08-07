import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import RandomizeSizes from "../RandomizeSizes";
import { marked } from "marked";
import { useEffect, useState } from "react";

const remarkPlugins = [gfm];

export default function NoteView({ text }) {
  // Step 0:
  // const html = marked(text /* { } */);
  // Step 1:
  // const html = text
  //   .split("\n\n")
  //   .map((i) => marked(i))
  //   .join("\n\n");

  // ↓

  // Step 2:
  // const paragraphs = text.split("\n\n");
  // let html = "";
  // while (paragraphs.length > 0) {
  //   const paragraph = paragraphs.shift();
  //   html += marked(paragraph) + "\n\n";
  // }

  // Step 3:
  const paragraphs = text.split("\n\n");
  const [html, setHtml] = useState("");
  useEffect(() => {
    const timerName = "processQueue" + Math.random();
    console.time(timerName);
    processQueue([...paragraphs], (result) => {
      console.timeEnd(timerName);
      setHtml(result);
    });
  }, [text]);

  // deepClone(...) -> 300ms
  // → clone(rootObject); clone(rootObject.prop1); clone(rootObject.prop2); ...

  // calculatePi(1e6) -> 500ms
  // -> calculatePi(1) + calculatePi(2) + calculatePi(3)

  return (
    <div className="note-view">
      <RandomizeSizes numberOfParagraphs={text.split("\n\n").length} />
      <div
        className="note-view__text"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}

function processQueue(queue, callback, html = "") {
  const NOW = performance.now();
  while (queue.length > 0) {
    if (
      "isInputPending" in navigator.scheduling &&
      navigator.scheduling.isInputPending()
    ) {
      /* -> true if the user tried to interact with the app */
      break;
    } else if (
      !("isInputPending" in navigator.scheduling) &&
      performance.now() - NOW > 100
    ) {
      break;
    }
    // useTransition
    // useDeferredValue

    const queueItem = queue.shift();
    html += marked(queueItem) + "\n\n";

    break;
  }

  if (queue.length > 0) {
    setTimeout(() => {
      processQueue(queue, callback, html);
    }, 0);
  } else {
    callback(html);
  }
}

// Step 0 (if needed): regain the control of the operation (ReactMarkdown → marked)
// Step 1: take a single expensive operation → convert into a sequence of cheaper operations
// Step 2: write the sequence of cheaper operations as a queue with a while() loop
// Step 3: move the queue into an processQueue(queue, callback) function (which means: transform the sync operation into an async operation)
// Step 4: apply isInputPending()
// Step 5: remember to cancel the previous queue if the new one arrives

// → debouncing
// → server rendering
// → replace completely with wysiwyg
// → move to web worker/wasm
//    → copying data is not free
// → virtualisation
// → split like react 18 concurrent mode (with isInputPending() API)
