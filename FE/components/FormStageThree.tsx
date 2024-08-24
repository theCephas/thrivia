import React from "react";
import InputField from "./InputField";
import Lock from "@/assets/svg/Lock";
import CustomButton from "./CustomButton";
import { View } from "react-native";

interface FormStageThreeProps {
  form: any;
  setForm: (value: any) => void;
  onSubmit: () => void;
}

const FormStageThree: React.FC<FormStageThreeProps> = ({
  form,
  setForm,
  onSubmit,
}) => {
  return (
    <>
      <InputField
        placeholder={`Password`}
        icon={Lock}
        value={form.password}
        secureTextEntry
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, password: value })}
      />
      <InputField
        placeholder={`Confirm Password`}
        icon={Lock}
        value={form.confirmPassword}
        secureTextEntry
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
      />
      <View className="mt-20">
        <CustomButton title="Register" onPress={onSubmit} />
      </View>
    </>
  );
};

export default FormStageThree;
