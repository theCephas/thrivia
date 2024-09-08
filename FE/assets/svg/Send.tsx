import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Send = (props: SvgProps) => (
  <Svg width={19} height={16} viewBox="0 0 19 16" fill="none" {...props}>
    <Path d="M0 16V10L8 8L0 6V0L19 8L0 16Z" fill="white" />
  </Svg>
);
export default Send;
