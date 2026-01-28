import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string; // For Tailwind classes or others
  style?: React.CSSProperties; // For inline styles
  width?: string | number;
  height?: string | number;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  className,
  style,
  width,
  height,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const animation = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: loop,
        autoplay: autoplay,
        animationData: animationData,
      });

      return () => {
        animation.destroy(); // Cleanup animation on unmount
      };
    }
  }, [animationData, loop, autoplay]);

  return (
    <div
      ref={container}
      className={className}
      style={{
        width: width || "100%",
        height: height || "100%",
        ...style,
      }}
    />
  );
};

export default LottieAnimation;
