declare module 'lottie-react' {
  import { CSSProperties } from 'react';

  interface LottieProps {
    animationData: any;
    loop?: boolean;
    autoplay?: boolean;
    style?: CSSProperties;
    className?: string;
    onComplete?: () => void;
    onLoopComplete?: () => void;
    onEnterFrame?: () => void;
    onSegmentStart?: () => void;
    speed?: number;
  }

  const Lottie: React.FC<LottieProps>;
  export default Lottie;
} 