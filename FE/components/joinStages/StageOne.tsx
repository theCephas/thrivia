import User from "@/assets/svg/User";
import InputField from "../InputField";
import DateInput from "../DateInput";
import CoopIcon from "@/assets/svg/CoopIcon";
import UserTag from "@/assets/svg/UserTag";

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
        onChangeText={(value) => setForm({ ...form, uniqueID: value })}
      />
      {/* <InputField
        placeholder={`Membership number`}
        value={form.memberNum}
        icon={UserTag}
        onChangeText={(value) => setForm({ ...form, memberNum: value })}
      /> */}
      <InputField
        placeholder={`Full name`}
        icon={User}
        value={form.fullName}
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, fullName: value })}
      />
      <DateInput onChangeDate={(value) => setForm({ ...form, date: value })} />
    </>
  );
};

export default StageOne;
