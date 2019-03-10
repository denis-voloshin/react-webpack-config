import React from "react";
import ReactDOM from "react-dom";

import Span from "./components/Span";

import styles from "./css/span.css";
import scss from "./scss/container-content.scss";

const App = () => (
  <div>
    <h4>Works!</h4>

    <h5>Span component:</h5>
    <Span className={styles.spanBg}>I am a component!</Span>

    <hr/>

    <div className={scss.container}>
      <div className={scss.content}>
        Content info
      </div>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
