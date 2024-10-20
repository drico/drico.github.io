import { each, times } from "lodash";
import { useEffect, useState, FC, useRef, RefObject } from "react";

const ROWS = 20;
const COLS = 40;

// const ROWS = 3;
// const COLS = 3;

const CURSORS = [{ x: 100, y: 500, w: 100 }];

const Slot: FC<{
  mousePos: { x: number; y: number };
  i: number;
  j: number;
}> = ({ mousePos, i, j }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pos = getCenterPos(ref);

  const force = getForce([...CURSORS, { ...mousePos, w: 200 }], pos);

  const dx = mousePos.x - pos.x;
  const dy = mousePos.y - pos.y;
  const distance = norm(dx, dy);
  // const size = Math.sqrt(distance);
  // const size = Math.max(30 - Math.sqrt(distance), 0);
  // const size = Math.min(1000 / distance, 20);
  const size = 20;
  // const factor = Math.min(50 / distance, 1);
  // const factorX = Math.min(50 / norm(dx, dx), 1);
  // const factorY = Math.min(50 / norm(dy, dy), 1);
  // const angle = Math.atan(dy / dx);
  const angle = Math.atan(force.x / force.y);
  // const angle = distance / 20;
  // const angle = 0;

  const factorX = Math.min(50 / norm(force.x, force.y), 1);
  const factorY = Math.min(50 / norm(force.x, force.y), 1);

  // const normalizedVector = { x: dx / distance, y: dy / distance };

  const factorDeCon = Math.min(100 / distance, 1);
  // const factorDeCon = 1;

  if (i === 1 && j === 1) {
    // console.log({ angle, dx, dy, factorDeCon });
    console.log(force);
  }
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        className="bg-white"
        style={{
          position: "absolute",
          transform: `scale(${factorX}, ${factorY})`,
          width: size,
          height: size,
        }}
      />
      {/* <div
        className="bg-yellow-800"
        style={{
          position: "absolute",
          transform: `scale(${factor}, ${factor})`,
          width: size,
          height: size,
        }}
      >
        {false && `${i} ${j} ${distance}`}
      </div> */}
      {/* <div
        className="bg-blue-800"
        style={{
          position: "absolute",
          transform: `rotate(${angle}rad)`,
          width: 2,
          height: size * 2,
        }}
      /> */}
      {/* <div
        className="bg-yellow-200"
        style={{
          position: "absolute",
          width: size,
          height: size,
        }}
      /> */}
      {/* <div
        className="bg-white"
        style={{
          position: "absolute",
          transform: `translate(${size / 2 - 1}px, ${size / 2 - 1}px)`,
          width: 2,
          height: 2,
        }}
      /> */}

      {/* <div
        className="bg-red-800"
        style={{
          position: "absolute",
          transform: `translate(${size / 2 - 1}px, ${size / 2 - 1}px) rotate(${
            0 - (Math.PI / 2) * factorDeCon
          }rad)`,
          transformOrigin: "top",
          width: 2,
          height: size,
        }}
      /> */}

      <div
        className="bg-blue-800"
        style={{
          position: "absolute",
          transform: `translate(${size / 2 - 1}px, ${size / 2 - 1}px) rotate(${
            -angle - (Math.PI / 2) * (4 + factorDeCon)
          }rad)`,
          transformOrigin: "top",
          width: 2,
          height: size,
        }}
      />
      <div
        className="bg-orange-800"
        style={{
          position: "absolute",
          transform: `translate(${size / 2 - 1}px, ${size / 2 - 1}px) rotate(${
            -angle + (Math.PI / 2) * (2 + factorDeCon)
          }rad)`,
          transformOrigin: "top",
          width: 2,
          height: size / 2,
        }}
      />
      {/* <div
        className="bg-red-800"
        style={{
          position: "absolute",
          transform: `translate(${size / 2 - 1}px, ${size / 2 - 1}px) rotate(${
            angle - (Math.PI / 2) * factorDeCon
          }rad)`,
          transformOrigin: "top",
          width: 2,
          height: size,
        }}
      />
      <div
        className="bg-green-800"
        style={{
          position: "absolute",
          transform: `translate(${size / 2 - 1}px, ${size / 2 - 1}px) rotate(${
            angle + (Math.PI / 2) * factorDeCon
          }rad)`,
          transformOrigin: "top",
          width: 2,
          height: size,
        }}
      /> */}
    </div>
  );
};

const getForce = (
  cursors: { x: number; y: number; w: number }[],
  position: { x: number; y: number }
) => {
  let fx = 0;
  let fy = 0;
  each(cursors, (cursor) => {
    const dx = cursor.x - position.x;
    const dy = cursor.y - position.y;
    const distance = norm(dx, dy);
    fx += (cursor.w * dx) / distance;
    fy += (cursor.w * dy) / distance;
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
      {/* <div className="bg-white h-[500px] w-[500px] relative flex flex-col justify-between"> */}
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
