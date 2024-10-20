import { compact, each, times } from "lodash";
import { useEffect, useState, FC, useRef, RefObject } from "react";

const ROWS = 20;
const COLS = 40;

const CURSORS: { x: number; y: number; w: number }[] = [
  { x: 200, y: 300, w: 1000 },
  // { x: 1500, y: 300, w: 500 },
];

const Slot: FC<{
  mousePos?: { x: number; y: number };
  i: number;
  j: number;
}> = ({ mousePos, i, j }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pos = getCenterPos(ref);

  const force = getForce(
    compact([...CURSORS, mousePos ? { ...mousePos, w: 1000 } : null]),
    pos,
    i,
    j
  );
  const size = 20;
  const angle = Math.atan(-force.x / force.y);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        className="bg-red-800"
        style={{
          position: "absolute",
          transform: `rotate(${angle - Math.PI / 2}rad)`,
          width: 2,
          height: size,
        }}
      />
    </div>
  );
};

const getForce = (
  cursors: { x: number; y: number; w: number }[],
  position: { x: number; y: number },
  i: number,
  j: number
) => {
  let fx = 0;
  let fy = 0;
  each(cursors, (cursor) => {
    const dx = cursor.x - position.x;
    const dy = cursor.y - position.y;
    const distance = norm(dx, dy);
    fx += (cursor.w * dx) / (distance * distance * distance);
    fy += (cursor.w * dy) / (distance * distance * distance);
  });
  return { x: fx, y: fy };
};

const getCenterPos = (ref: RefObject<HTMLDivElement> | null) => {
  const pos = ref?.current?.getBoundingClientRect();
  if (!pos) return { x: 0, y: 0 };
  return { x: (pos.left + pos.right) / 2, y: (pos.top + pos.bottom) / 2 };
};

const norm = (dx: number, dy: number) => {
  return Math.sqrt(dx * dx + dy * dy);
};

const Gravity = () => {
  const [mousePos, setMousePos] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="bg-grey h-[100vh] relative flex flex-col justify-between">
      {times(ROWS, (i) => (
        <div className="flex justify-between">
          {times(COLS, (j) => {
            return <Slot mousePos={mousePos} i={i} j={j} />;
          })}
        </div>
      ))}
    </div>
  );
};
export default Gravity;
