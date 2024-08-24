import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ArrowDown = (props: SvgProps) => (
  <Svg width={16} height={8} viewBox="0 0 16 8" fill="none" {...props}>
    <Path
      d="M14.5999 1.45837L9.16657 6.89171C8.5249 7.53338 7.4749 7.53338 6.83324 6.89171L1.3999 1.45837"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowDown;
