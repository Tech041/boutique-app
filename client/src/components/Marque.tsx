// components/Marquee.tsx
"use client";

const style = "text-white text-sm font-light font-bold mx-8";
const Marquee = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-3  ">
      <div className="marquee">
        {/* Repeat enough times to cover the screen */}
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
        <span className={style}>NIGERIAN BRAND MADE IN ITALY</span>
      </div>
    </div>
  );
};

export default Marquee;
