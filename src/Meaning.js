import React from "react";
import Synonyms from "./Synonyms";

export default function Meaning(props) {
  return (
    <div className="Meaning">
      <h2>{props.meaning.partOfSpeech}</h2>
      <p>
        <strong>Definition: </strong> {props.meaning.definition}
      </p>
      <br />
      <p>
        <strong>Example: </strong>
        {props.meaning.example}
      </p>
      <br />
      <Synonyms synonyms={props.meaning.synonyms} />
    </div>
  );
}