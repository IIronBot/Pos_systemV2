import React from "react";
import { useContext, useEffect, useRef } from "react";
import { Note } from "phosphor-react";
import { orderContext } from "../context/exportContext";
import { menuContext } from "../context/exportContext";

export function NoteEditor() {
  const noteRef = useRef("");
  const { noteValue, setNoteValue } = useContext(orderContext);
  const { noteRender, setNoteRender } = useContext(menuContext);

  const run = () => {
    if (noteRef.current) {
      setNoteValue(noteRef.current.value);
    }
  };
  useEffect(() => {
    run();
  }, [noteRef]);

  return (
    <div>
      <Note
        className="text-white h-10 w-10 m-3 absolute top-1.5 right-3 cursor-pointer"
        onClick={() => {
          setNoteRender(!noteRender);
        }}
      />
      {noteRender && (
        <div className="flex flex-col justify-center items-center z-10">
          <p>Note</p>
          <textarea
            className="h-[150px] w-[150px] p-[20px] mb-[20px] resize-none bg-white"
            value={noteValue}
            onChange={() => run()}
            ref={noteRef}
          ></textarea>
        </div>
      )}
    </div>
  );
}
