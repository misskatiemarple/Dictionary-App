import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
  let [word, setWord] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);
  let [error, setError] = useState(false);

  function handleDictionaryResponse(response) {
    if (response.data.status === "not_found") {
      setError(true);
      return;
    }
    setError(false);
    setResults(response.data);
  }

  function handleImageResponse(response) {
    setPhotos(response.data.photos);
  }

  function search() {
    let apiKey = "3041fdbb74ta3a686b2ca3f782407o93";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
    axios.get(apiUrl).then(handleDictionaryResponse).catch(handleError);

    const imageApiKey = "3041fdbb74ta3a686b2ca3f782407o93";
    let imageApiUrl = `https://api.shecodes.io/images/v1/search?query=${word}&key=${imageApiKey}`;
    axios.get(imageApiUrl).then(handleImageResponse);
  }

  function handleError(error) {
    setError(true);
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

  if (loaded && !error) {
    return (
      <div className="Dictionary">
        <section>
          <h2>What word do you want to look up?</h2>
          <form id="form" onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleWordChange}
              defaultValue={props.defaultKeyword}
            />
          </form>
          <div className="hint">suggested words: happy, sun, yoga...</div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else if (loaded && error) {
    return (
      <div className="Dictionary">
        <section>
          <h2>What word do you want to look up?</h2>
          <form id="form" onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleWordChange}
              defaultValue={props.defaultKeyword}
            />
          </form>
          <div className="hint">suggested words: happy, sun, yoga...</div>
        </section>
        <h1 className="error">Oops. Sorry, word not found</h1>
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
