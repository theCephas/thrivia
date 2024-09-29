/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Svg, { Circle, Text } from "react-native-svg";
import { View, Text as RNText } from "react-native";

interface CircleProgressProps {
  stage: number;
  totalStages: number;
}

const CircleProgress = ({ stage, totalStages }: CircleProgressProps) => {
  const radius = 50;
  const strokeWidth = 13;
  const circumference = 2 * Math.PI * radius;
  const progress = (stage / totalStages) * circumference;

  return (
    <View className="flex items-center justify-center">
      <Svg height="40" width="40" viewBox="0 0 120 120">
        <Circle
          stroke="#ddd"
          fill="none"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#27816C"
          fill="none"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress + circumference}
          strokeLinecap="round"
        />
        <Text
          fill="#fff"
          fontSize="40"
          fontWeight="bold"
          x="40"
          y="75"
          textAnchor="middle"
        >
          {stage}/{totalStages}
        </Text>
      </Svg>
    </View>
  );
};

export default CircleProgress;
