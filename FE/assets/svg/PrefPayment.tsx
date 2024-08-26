import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const PrefPayment = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M1.3335 5.66663H9.00016"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 11H5.33333"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11H9.66667"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.6668 8.02004V10.74C14.6668 13.08 14.0735 13.6667 11.7068 13.6667H4.2935C1.92683 13.6667 1.3335 13.08 1.3335 10.74V5.26004C1.3335 2.92004 1.92683 2.33337 4.2935 2.33337H9.00016"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M11 4.16663H14.6667" stroke="white" strokeLinecap="round" />
    <Path d="M12.8335 6.00004V2.33337" stroke="white" strokeLinecap="round" />
  </Svg>
);
export default PrefPayment;
