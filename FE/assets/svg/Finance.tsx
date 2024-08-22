import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Finance = (props: SvgProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
    <Path d="M6.23334 15.6249V13.8999" strokeLinecap="round" />
    <Path d="M10.5 15.625V12.175" strokeLinecap="round" />
    <Path d="M14.7667 15.625V10.4417" strokeLinecap="round" />
    <Path
      d="M14.7667 5.375L14.3833 5.825C12.2583 8.30833 9.40834 10.0667 6.23334 10.8583"
      strokeLinecap="round"
    />
    <Path
      d="M12.325 5.375H14.7667V7.80833"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 18.8334H13C17.1667 18.8334 18.8333 17.1667 18.8333 13.0001V8.00008C18.8333 3.83341 17.1667 2.16675 13 2.16675H8C3.83334 2.16675 2.16667 3.83341 2.16667 8.00008V13.0001C2.16667 17.1667 3.83334 18.8334 8 18.8334Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Finance;
