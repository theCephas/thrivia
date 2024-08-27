import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const FinanceProfile = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path d="M4.58667 12.1002V10.7202" stroke="white" strokeLinecap="round" />
    <Path d="M8 12.0998V9.33984" stroke="white" strokeLinecap="round" />
    <Path d="M11.4133 12.0998V7.95312" stroke="white" strokeLinecap="round" />
    <Path
      d="M11.4133 3.8999L11.1067 4.2599C9.40667 6.24657 7.12667 7.65324 4.58667 8.28657"
      stroke="white"
      strokeLinecap="round"
    />
    <Path
      d="M9.45999 3.8999H11.4133V5.84657"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.00001 14.6668H10C13.3333 14.6668 14.6667 13.3335 14.6667 10.0002V6.00016C14.6667 2.66683 13.3333 1.3335 10 1.3335H6.00001C2.66668 1.3335 1.33334 2.66683 1.33334 6.00016V10.0002C1.33334 13.3335 2.66668 14.6668 6.00001 14.6668Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default FinanceProfile;
