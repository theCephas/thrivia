import React from "react";
import Address from "@/assets/svg/Address";
import Call from "@/assets/svg/Call";
import Email from "@/assets/svg/Email";
import User from "@/assets/svg/User";
import InputField from "../InputField";
import DateInput from "../DateInput";

interface StageOneProps {
  form: any;
  setForm: (value: any) => void;
}

const StageOne: React.FC<StageOneProps> = ({ form, setForm }) => {
  return (
    <>
      <InputField
        placeholder={`Full name`}
        icon={User}
        value={form.fullName}
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, fullName: value })}
      />
      <DateInput onChangeDate={(value) => setForm({ ...form, date: value })} />
      <InputField
        placeholder={`Phone Number`}
        icon={Call}
        value={form.phoneNumber}
        keyboardType="number-pad"
        onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
      />
      <InputField
        placeholder={`Email Address`}
        icon={Email}
        value={form.email}
        keyboardType="email-address"
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <InputField
        placeholder={`Residential Address`}
        icon={Address}
        value={form.add}
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, address: value })}
      />
    </>
  );
};

export default StageOne;
