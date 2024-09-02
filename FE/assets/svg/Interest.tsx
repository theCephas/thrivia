import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Interest = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M15.8337 4.16675L4.16699 15.8334"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.9163 15.8334C14.0669 15.8334 14.9997 14.9007 14.9997 13.7501C14.9997 12.5995 14.0669 11.6667 12.9163 11.6667C11.7657 11.6667 10.833 12.5995 10.833 13.7501C10.833 14.9007 11.7657 15.8334 12.9163 15.8334Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.91634 8.33341C9.06693 8.33341 9.99967 7.40067 9.99967 6.25008C9.99967 5.09949 9.06693 4.16675 7.91634 4.16675C6.76575 4.16675 5.83301 5.09949 5.83301 6.25008C5.83301 7.40067 6.76575 8.33341 7.91634 8.33341Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Interest;
