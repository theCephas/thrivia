import React from "react";
import InputField from "../InputField";
import Address from "@/assets/svg/Address";
import Call from "@/assets/svg/Call";
import Email from "@/assets/svg/Email";
import User from "@/assets/svg/User";

interface FormStageOneProps {
  form: any;
  setForm: (value: any) => void;
}

const FormStageOne: React.FC<FormStageOneProps> = ({ form, setForm }) => {
  return (
    <>
      <InputField
        placeholder={`Cooperative name`}
        icon={User}
        value={form.coopName}
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, coopName: value })}
      />
      <InputField
        placeholder={`Business registration number`}
        icon={User}
        value={form.businessRegNumber}
        keyboardType="number-pad"
        onChangeText={(value) => setForm({ ...form, businessRegNumber: value })}
      />
      <InputField
        placeholder={`Business Address`}
        icon={Address}
        value={form.businessAddress}
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, businessAddress: value })}
      />
      <InputField
        placeholder={`Contact Email Address`}
        icon={Email}
        value={form.email}
        keyboardType="email-address"
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <InputField
        placeholder={`Contact Phone Number`}
        icon={Call}
        value={form.phoneNumber}
        keyboardType="number-pad"
        onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
      />
    </>
  );
};

export default FormStageOne;
