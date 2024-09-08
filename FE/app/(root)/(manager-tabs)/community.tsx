import Dot from "@/assets/svg/Dot";
import Filter from "@/assets/svg/Filter";
import Search from "@/assets/svg/Search";
import { members } from "@/constants";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";

const Community = () => {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(members.length).fill(false)
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [request, setRequest] = useState<any[]>([]);
  const [activeNav, setActiveNave] = useState("members");
  const { token, cooperativeUUID } = useAuthStore();
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axiosInstance.get(
          `/cooperatives/${cooperativeUUID}/applications`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.data;

        console.log(data);
        setRequest(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRequests();
  }, []);

  useEffect(() => {
    activeNav === "members"
      ? setData(members)
      : activeNav === "requests"
      ? setData(request)
      : "";
  }, [members, activeNav, request]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <View className="h-full bg-[#1d2128]">
      <View className="mt-12 py-6 px-4 fixed w-full bg-[#0D1015]">
        <Text className="text-white text-center text-2xl font-bold">
          Community
        </Text>
      </View>

      <View className="flex flex-row items-center justify-center gap-4 pt-4 pb-2">
        {["Members", "Requests"].map((text, i) => (
          <TouchableOpacity
            className={`border-b-[3px] pb-1 ease-in-out duration-500 ${
              activeNav === text.toLocaleLowerCase()
                ? "border-primary"
                : "border-transparent"
            }`}
            onPress={() => setActiveNave(text.toLocaleLowerCase())}
            key={i}
          >
            <Text className="text-xl text-white">{text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="p-4 flex flex-row items-center gap-x-8 w-full">
        <View className="relative">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#fff"
            className="w-[300px] border px-10 border-white rounded-full h-[40px] text-white text-[14px]"
          />
          <Search className="absolute top-3 left-3 " />
        </View>
        <View>
          <Filter />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 75 }}>
        <View className="p-4">
          {data &&
            data?.map((item, index) => (
              <View key={index}>
                <View className="h-[70px] w-full relative -z-30 px-4 py-2 border-[#E8E7E780] border-t flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-x-4">
                    <Checkbox
                      status={checkedState[index] ? "checked" : "unchecked"}
                      onPress={() => handleCheckboxChange(index)}
                      color="#27816C"
                    />
                    <View>
                      <Text className="text-white text-[14px] font-semibold ">
                        {item.fullName || item.type} membership request
                      </Text>
                      <Text className="text-white pt-2 text-[12px]">
                        {item.status || item.userId}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    className="w-[10px]"
                  >
                    <Dot />
                  </TouchableOpacity>
                </View>
                {activeIndex === index && (
                  <LinearGradient
                    colors={["#F4F4F433", "#FFFFFF0B"]}
                    className="absolute right-[30px] bg-gray-600 top-14 p-2 flex flex-col justify-center rounded-[2px] shadow-lg z-10 w-[200px] h-[110px] "
                  >
                    <Text
                      onPress={() =>
                        activeNav === "members"
                          ? router.navigate(
                              "/(others)/(manager-pages)/loan-request-details"
                            )
                          : activeNav === "requests"
                          ? router.navigate(
                              `/(others)/(manager-pages)/${item.uuid}`
                            )
                          : ""
                      }
                      className="text-white text-[20px] z-50 font-bold w-full "
                    >
                      View Details
                    </Text>

                    <Text className="text-white text-[20px] z-50 py-4 font-bold w-full ">
                      Block Member
                    </Text>
                    <Text className="text-white text-[20px] z-50 font-bold w-full ">
                      Delete
                    </Text>
                  </LinearGradient>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Community;
