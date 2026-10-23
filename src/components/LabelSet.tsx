export default function LabelSet({
  labels,
  id,
  type,
}: {
  labels: (string | number)[];
  id: number;
  type: "column" | "row";
}): React.JSX.Element {
  const labelDivs = labels.map((label, index) => (
    <div key={`${type}Label${id}_${index}`}>{label}</div>
  ));
  return (
    <div className={`${type}Label label${id} size${labels.length}`}>
      {labelDivs}
    </div>
  );
}
