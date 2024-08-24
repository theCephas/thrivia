import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Lock = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M4 6.66668V5.33334C4 3.12668 4.66667 1.33334 8 1.33334C11.3333 1.33334 12 3.12668 12 5.33334V6.66668"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.00001 12.3333C8.92048 12.3333 9.66668 11.5871 9.66668 10.6667C9.66668 9.74619 8.92048 9 8.00001 9C7.07954 9 6.33334 9.74619 6.33334 10.6667C6.33334 11.5871 7.07954 12.3333 8.00001 12.3333Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.3333 14.6667H4.66668C2.00001 14.6667 1.33334 14 1.33334 11.3333V9.99999C1.33334 7.33332 2.00001 6.66666 4.66668 6.66666H11.3333C14 6.66666 14.6667 7.33332 14.6667 9.99999V11.3333C14.6667 14 14 14.6667 11.3333 14.6667Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Lock;
