import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Address = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M7.99992 8.95334C9.14867 8.95334 10.0799 8.02209 10.0799 6.87334C10.0799 5.72458 9.14867 4.79333 7.99992 4.79333C6.85117 4.79333 5.91992 5.72458 5.91992 6.87334C5.91992 8.02209 6.85117 8.95334 7.99992 8.95334Z"
      stroke="white"
    />
    <Path
      d="M2.4133 5.66004C3.72664 -0.113291 12.28 -0.106624 13.5866 5.66671C14.3533 9.05338 12.2466 11.92 10.4 13.6934C9.05997 14.9867 6.93997 14.9867 5.5933 13.6934C3.7533 11.92 1.64664 9.04671 2.4133 5.66004Z"
      stroke="white"
    />
  </Svg>
);
export default Address;
