import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import LazyHydrate from "react-lazy-hydration";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Button = () => {
  return (
    <button style={{ color: "red" }} onClick={() => alert("Boo")}>
      rghvourgwh
    </button>
  );
};

const Button = dynamic(() => import("../Button"));

export default function NoteView({ text }) {
  const textWithHeader = "## " + text;

  return (
    <div className="note-view" key={text}>
      {/* <LazyHydrate ssrOnly> */}
      <Suspense fallback="Loading...">
        {textWithHeader.split("\n\n").map((paragraph, index) => {
          return (
            <ReactMarkdown remarkPlugins={[gfm]} key={index}>
              {paragraph}
            </ReactMarkdown>
          );
        })}
        <Button />
      </Suspense>
      {/* </LazyHydrate> */}
    </div>
  );
}

/*

const LazyHydrate = ({ children }) => {
  return isSSR ?
    <div>{children}</div> :
    <div dangerouslySetInnerHTML={{ html: '' }} ignoreHydrationWarnings />
}
*/

// hydrate → ~render
