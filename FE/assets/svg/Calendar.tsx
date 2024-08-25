import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Calendar = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M5.33334 1.3335V3.3335"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.6667 1.3335V3.3335"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.6667 2.3335C12.8867 2.4535 14 3.30016 14 6.4335V10.5535C14 13.3002 13.3333 14.6735 10 14.6735H6C2.66667 14.6735 2 13.3002 2 10.5535V6.4335C2 3.30016 3.11333 2.46016 5.33333 2.3335H10.6667Z"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.8333 11.7334H2.16666"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 5.5C7.18 5.5 6.48667 5.94667 6.48667 6.81333C6.48667 7.22667 6.68 7.54 6.97334 7.74C6.56667 7.98 6.33334 8.36667 6.33334 8.82C6.33334 9.64667 6.96667 10.16 8 10.16C9.02667 10.16 9.66667 9.64667 9.66667 8.82C9.66667 8.36667 9.43334 7.97333 9.02 7.74C9.32 7.53333 9.50667 7.22667 9.50667 6.81333C9.50667 5.94667 8.82 5.5 8 5.5ZM8 7.39333C7.65334 7.39333 7.4 7.18667 7.4 6.86C7.4 6.52667 7.65334 6.33333 8 6.33333C8.34667 6.33333 8.6 6.52667 8.6 6.86C8.6 7.18667 8.34667 7.39333 8 7.39333ZM8 9.33333C7.56 9.33333 7.24 9.11333 7.24 8.71333C7.24 8.31333 7.56 8.1 8 8.1C8.44 8.1 8.76 8.32 8.76 8.71333C8.76 9.11333 8.44 9.33333 8 9.33333Z"
      fill="white"
    />
  </Svg>
);
export default Calendar;
