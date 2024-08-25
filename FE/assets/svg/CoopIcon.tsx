import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CoopIcon = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M1.33334 4.66683V3.00016C1.33334 2.55814 1.50894 2.13421 1.8215 1.82165C2.13406 1.50909 2.55798 1.3335 3.00001 1.3335H4.66668M1.33334 11.3335V13.0002C1.33334 13.4422 1.50894 13.8661 1.8215 14.1787C2.13406 14.4912 2.55798 14.6668 3.00001 14.6668H4.66668M11.3333 1.3335H13C13.442 1.3335 13.866 1.50909 14.1785 1.82165C14.4911 2.13421 14.6667 2.55814 14.6667 3.00016V4.66683M11.3333 14.6668H13C13.442 14.6668 13.866 14.4912 14.1785 14.1787C14.4911 13.8661 14.6667 13.4422 14.6667 13.0002V11.3335M5.50001 6.3335H5.50834M10.5 6.3335H10.5083M5.91668 10.5002C6.18824 10.7773 6.51238 10.9975 6.87012 11.1478C7.22785 11.2982 7.61198 11.3756 8.00001 11.3756C8.38804 11.3756 8.77217 11.2982 9.1299 11.1478C9.48764 10.9975 9.81178 10.7773 10.0833 10.5002"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CoopIcon;
