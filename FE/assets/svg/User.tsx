import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const User = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M7.99999 8C9.84094 8 11.3333 6.50762 11.3333 4.66667C11.3333 2.82572 9.84094 1.33334 7.99999 1.33334C6.15904 1.33334 4.66666 2.82572 4.66666 4.66667C4.66666 6.50762 6.15904 8 7.99999 8Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.7267 14.6667C13.7267 12.0867 11.16 10 8.00001 10C4.84001 10 2.27335 12.0867 2.27335 14.6667"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default User;
