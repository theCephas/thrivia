import React, { useState } from "react";
import { View, TextInput, Platform, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Calendar from "@/assets/svg/Calendar";
import ArrowDown from "@/assets/svg/ArrowDown";

interface Props {
  onChangeDate: (value: any) => void;
}

export default function DateInput({ onChangeDate }: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    onChangeDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View
      className={`flex flex-row justify-start items-center relative border-b border-white my-2 w-full`}
    >
      <Text className="border-r border-white mt-6 p-2">
        <Calendar style={[{ width: 20, height: 20 }]} />
      </Text>
      <TextInput
        style={styles.input}
        className={`rounded-full text-[15px] font-Onest text-white flex-1 ${
          !date ? "ml-3" : "ml-0"
        }`}
        value={date ? date.toDateString() : ""}
        onFocus={showDatepicker}
        showSoftInputOnFocus={false}
        placeholder="Date of birth"
        placeholderTextColor="#FFFFFF"
      />
      <View className="pr-4">
        <ArrowDown />
      </View>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 16,
  },
});
