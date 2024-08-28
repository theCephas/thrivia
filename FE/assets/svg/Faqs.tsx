import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Faqs = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M11.3333 12.2868H8.66668L5.7 14.2601C5.26 14.5535 4.66668 14.2402 4.66668 13.7068V12.2868C2.66668 12.2868 1.33334 10.9535 1.33334 8.95349V4.95345C1.33334 2.95345 2.66668 1.62012 4.66668 1.62012H11.3333C13.3333 1.62012 14.6667 2.95345 14.6667 4.95345V8.95349C14.6667 10.9535 13.3333 12.2868 11.3333 12.2868Z"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.99999 7.57324V7.43327C7.99999 6.97993 8.28001 6.73992 8.56001 6.54659C8.83334 6.35992 9.10664 6.11993 9.10664 5.67993C9.10664 5.0666 8.61332 4.57324 7.99999 4.57324C7.38666 4.57324 6.89334 5.0666 6.89334 5.67993"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.99699 9.16683H8.00299"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Faqs;
