import SelectBank from "../../assets/svg/SelectBank";
import Dropdown from "../Dropdown";
import Job from "../../assets/svg/Job";
import Coins from "../../assets/svg/Coins";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

interface Props {
  form: any;
  setForm: (value: any) => void;
}

const ApplyStageThree: React.FC<Props> = ({ form, setForm }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Dropdown
        placeholder="Income source"
        value={form.sourceOfIncome}
        options={["Bank A", "Bank B", "Bank C"]}
        onSelect={(value) => setForm({ ...form, sourceOfIncome: value })}
        icon={Coins}
      />
      <Dropdown
        placeholder="Employment details"
        value={form.employmentDetails}
        options={["Bank A", "Bank B", "Bank C"]}
        onSelect={(value) => setForm({ ...form, employmentDetails: value })}
        icon={Job}
      />
      <Dropdown
        placeholder="Bank information"
        value={form.bankInfo}
        options={["3 months", "6 months", "1 year"]}
        onSelect={(value) => setForm({ ...form, bankInfo: value })}
        icon={SelectBank}
      />
      <TouchableOpacity
        className="flex-row items-center mt-8"
        onPress={() => setIsChecked(!isChecked)}
      >
        <View
          className={`w-[14px] h-[14] border border-white  ${
            isChecked ? "" : ""
          } flex items-center justify-center`}
        >
          {isChecked && <View className={`w-2 h-2 bg-primary`} />}
        </View>
        <Text className={`ml-4 pr-14 text-white`}>
          By applying for this loan you agree to{" "}
          <Text className="text-primary inline underline">Terms</Text> of{" "}
          <Text className="text-primary inline underline">Conditions</Text> of
          this application
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ApplyStageThree;
