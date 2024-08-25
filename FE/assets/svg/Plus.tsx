import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Plus = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 5C12 4.44772 12.4477 4 13 4H11C11.5523 4 12 4.44772 12 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H12V19C12 19.5523 11.5523 20 11 20H13C13.5523 20 14 19.5523 14 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H14V5Z"
      fill="white"
    />
  </Svg>
);
export default Plus;
