import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
const Homeprofile = (props: SvgProps) => (
  <Svg width={40} height={41} viewBox="0 0 40 41" fill="none" {...props}>
    <Rect y={0.5} width={40} height={40} rx={8} fill="#DDDDDD" />
    <Path
      d="M20.12 20.78C20.05 20.77 19.96 20.77 19.88 20.78C18.12 20.72 16.72 19.28 16.72 17.51C16.72 15.7 18.18 14.23 20 14.23C21.81 14.23 23.28 15.7 23.28 17.51C23.27 19.28 21.88 20.72 20.12 20.78Z"
      stroke="#939090"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M26.74 27.3801C24.96 29.0101 22.6 30.0001 20 30.0001C17.4 30.0001 15.04 29.0101 13.26 27.3801C13.36 26.4401 13.96 25.5201 15.03 24.8001C17.77 22.9801 22.25 22.9801 24.97 24.8001C26.04 25.5201 26.64 26.4401 26.74 27.3801Z"
      stroke="#939090"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
      stroke="#939090"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Homeprofile;
