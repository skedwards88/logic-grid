export default function LabelSet({
  displayLabels,
  id,
  type,
}: {
  displayLabels: string[];
  id: number;
  type: "column" | "row";
}): React.JSX.Element {
  const labelDivs = displayLabels.map((label, index) => (
    <div key={`${type}Label${String(id)}_${String(index)}`}>{label}</div>
  ));
  return (
    <div
      className={`${type}Label label${String(id)} size${String(displayLabels.length)}`}
    >
      {labelDivs}
    </div>
  );
}
