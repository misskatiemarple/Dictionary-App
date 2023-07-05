import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary(props) {
  let [word, setWord] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function handleResponse(response) {
    setResults(response.data);
  }

  function search() {
    let apiKey = "3041fdbb74ta3a686b2ca3f782407o93";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function load() {
    setLoaded(true);
    search();
  }
  function handleWordChange(event) {
    setWord(event.target.value);
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h2>What word do you want to look up?</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleWordChange}
              defaultValue={props.defaultKeyword}
            />
          </form>
          <div className="hint">suggested words: happy, sun, yoga...</div>
        </section>
        <Results results={results} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
