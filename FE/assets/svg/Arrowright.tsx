import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Arrowright = (props: SvgProps) => (
  <Svg width={20} height={21} viewBox="0 0 20 21" fill="none" {...props}>
    <Path
      d="M7.45825 3.9L12.8916 9.33333C13.5333 9.975 13.5333 11.025 12.8916 11.6667L7.45825 17.1"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Arrowright;
