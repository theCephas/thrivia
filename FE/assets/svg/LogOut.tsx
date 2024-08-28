import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const LogOut = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M11.6267 9.74683L13.3333 8.04016L11.6267 6.3335"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.50665 8.04004H13.2867"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.83999 13.3332C4.89332 13.3332 2.50665 11.3332 2.50665 7.99984C2.50665 4.6665 4.89332 2.6665 7.83999 2.6665"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LogOut;
