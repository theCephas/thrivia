import * as React from "react";
import Svg, { SvgProps, Circle } from "react-native-svg";
const MenuDotted = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={5} r={2} fill="white" />
    <Circle cx={12} cy={12} r={2} fill="white" />
    <Circle cx={12} cy={19} r={2} fill="white" />
  </Svg>
);
export default MenuDotted;
