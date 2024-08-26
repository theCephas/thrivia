import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const UserTag = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M12 12.5732H11.4933C10.96 12.5732 10.4533 12.7798 10.08 13.1532L8.93998 14.2798C8.41998 14.7932 7.57334 14.7932 7.05334 14.2798L5.91333 13.1532C5.54 12.7798 5.02667 12.5732 4.5 12.5732H4C2.89333 12.5732 2 11.6865 2 10.5932V3.31982C2 2.22649 2.89333 1.33984 4 1.33984H12C13.1067 1.33984 14 2.22649 14 3.31982V10.5932C14 11.6798 13.1067 12.5732 12 12.5732Z"
      stroke="white"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 6.66671C8.85788 6.66671 9.55334 5.97124 9.55334 5.11336C9.55334 4.25548 8.85788 3.56006 8 3.56006C7.14212 3.56006 6.44666 4.25548 6.44666 5.11336C6.44666 5.97124 7.14212 6.66671 8 6.66671Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.6667 10.4399C10.6667 9.2399 9.47334 8.2666 8.00001 8.2666C6.52668 8.2666 5.33334 9.2399 5.33334 10.4399"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default UserTag;
