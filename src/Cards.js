import * as React from "react";
export default function Cards(props) {
  return (
    <a href={props.url} className="grid-item" target="_blank">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
    </a>
  );
}
