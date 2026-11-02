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
    <div key={`${type}Label${id}_${index}`}>{label}</div>
  ));
  return (
    <div className={`${type}Label label${id} size${displayLabels.length}`}>
      {labelDivs}
    </div>
  );
}
