const gridColumns = 24;
const gridRows = 14;

const gridCellColors: {
  x: number;
  y: number;
  color: string;
  opacity?: number;
}[] = [
  { x: 6, y: 1, color: "#F9BEF9", opacity: 0.1 },
  { x: 8, y: 1, color: "#F9BEF9", opacity: 0.3 },
  { x: 9, y: 1, color: "#F9BEF9", opacity: 0.2 },
  { x: 8, y: 2, color: "#F9BEF9", opacity: 0.1 },
  { x: 11, y: 0, color: "#F9BEF9", opacity: 0.2 },
  { x: 12, y: 0, color: "#F9BEF9", opacity: 0.1 },
  { x: 15, y: 2, color: "#F9BEF9", opacity: 0.1 },
  { x: 15, y: 2, color: "#F9BEF9", opacity: 0.1 },
  { x: 16, y: 2, color: "#9F269F", opacity: 0.03 },
  { x: 15, y: 3, color: "#791A79", opacity: 0.05 },
];

const gridCellColorMap = new Map(
  gridCellColors.map(({ x, y, color, opacity }) => [
    `${x}-${y}`,
    { color, opacity },
  ]),
);

export const Grid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-[16px]">
      <div
        className="absolute left-[-482px] top-[-39px] grid"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, 80px)`,
          gridAutoRows: "80px",
        }}
      >
        {Array.from({ length: gridColumns * gridRows }).map((_, index) => {
          const x = index % gridColumns;
          const y = Math.floor(index / gridColumns);
          const cellStyle = gridCellColorMap.get(`${x}-${y}`);

          return (
            <div key={index} className="relative w-[80px] h-[80px]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: cellStyle?.color,
                  opacity: cellStyle?.opacity,
                }}
              />
              <div className="absolute left-0 top-0 h-full w-[0.75px] bg-[#FBCFFB]/40" />
              <div className="absolute left-0 top-0 h-[0.7px] w-full bg-[#FBCFFB]/40" />
              <div className="absolute right-0 top-0 h-full w-[0.75px] bg-[#FBCFFB]/40" />
              <div className="absolute bottom-0 left-0 h-[0.7px] w-full bg-[#FBCFFB]/40" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
