import User from "../../assets/svg/User";
import InputField from "../InputField";
import DateInput from "../DateInput";
import CoopIcon from "../../assets/svg/CoopIcon";

interface StageOneProps {
  form: any;
  setForm: (value: any) => void;
}

const StageOne: React.FC<StageOneProps> = ({ form, setForm }) => {
  return (
    <>
      <InputField
        placeholder={`Cooperative Unique ID`}
        icon={CoopIcon}
        value={form.uniqueID}
        onChangeText={(value: any) => setForm({ ...form, uniqueID: value })}
      />
      {/* <InputField
        placeholder={`Membership number`}
        value={form.memberNum}
        icon={UserTag}
        onChangeText={(value: any) => setForm({ ...form, memberNum: value })}
      /> */}
      <InputField
        placeholder={`Full name`}
        icon={User}
        value={form.fullName}
        keyboardType="default"
        onChangeText={(value: any) => setForm({ ...form, fullName: value })}
      />
      <DateInput
        onChangeDate={(value: any) => setForm({ ...form, date: value })}
      />
    </>
  );
};

export default StageOne;
