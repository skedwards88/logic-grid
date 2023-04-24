import React from "react";

export default function LabelSet({labels, id, type}) {
  const labelDivs = labels.map((label) => <div>{label}</div>);
  return <div className={`${type}Label Label${id}`}>{labelDivs}</div>;
}
