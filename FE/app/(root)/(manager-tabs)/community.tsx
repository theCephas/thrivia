import Dot from "@/assets/svg/Dot";
import Filter from "@/assets/svg/Filter";
import Search from "@/assets/svg/Search";
import CustomButton from "@/components/CustomButton";
import InviteModal from "@/components/InviteModal";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Community = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [request, setRequest] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const [activeNav, setActiveNav] = useState("members");
  const [refreshing, setRefreshing] = useState(false);
  const { token, cooperativeUUID } = useAuthStore();
  const axiosInstance = useAxiosInstance();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmit = () => {
    setIsModalVisible(true);
  };

  const getRequests = useCallback(async () => {
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
      setRequest(res.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  }, [axiosInstance, cooperativeUUID, token]);

  const getMembers = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/cooperatives/${cooperativeUUID}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const filteredMembers = res.data.filter(
        (member: any) => member.role === "MEMBER"
      );
      setMembers(filteredMembers);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  }, [axiosInstance, cooperativeUUID, token]);

  useEffect(() => {
    getRequests();
    getMembers();
  }, [getRequests, getMembers]);

  useEffect(() => {
    setCheckedState(new Array(members.length).fill(false));
  }, [members]);

  useEffect(() => {
    setData(activeNav === "members" ? members : request);
  }, [members, request, activeNav]);

  const handleCheckboxChange = (index: number) => {
    setCheckedState((prev) =>
      prev.map((item, idx) => (idx === index ? !item : item))
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([getMembers(), getRequests()]).then(() => setRefreshing(false));
  }, [getMembers, getRequests]);

  const MemberItem = ({ item, index }: { item: any; index: number }) => (
    <View key={index}>
      <View className="h-[70px] w-full relative -z-30 py-2 border-[#E8E7E780] border-y flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          {activeNav === "members" ? (
            <View className="flex flex-row gap-4">
              <View>
                <Checkbox
                  status={checkedState[index] ? "checked" : "unchecked"}
                  onPress={() => handleCheckboxChange(index)}
                  color="#27816C"
                />
              </View>
              <View>
                <Text className="text-white text-[14px] font-semibold">
                  {item.user.firstName} {item.user.lastName}
                </Text>
                <Text className="text-white pt-2 text-[12px]">
                  {item.user.email}
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex flex-row gap-4 border-[#E8E7E780]">
              <View>
                <Checkbox
                  status={checkedState[index] ? "checked" : "unchecked"}
                  onPress={() => handleCheckboxChange(index)}
                  color="#27816C"
                />
              </View>
              <View>
                <Text className="text-white text-[14px] font-semibold">
                  {item.user.firstName} {item.user.lastName} membership request
                </Text>
                <Text className="text-white pt-2 text-[12px]">
                  {item.status}
                </Text>
              </View>
            </View>
          )}
        </View>
        {activeNav && (
          <TouchableOpacity
            onPress={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-[20px]"
          >
            <Dot />
          </TouchableOpacity>
        )}
      </View>
      {activeIndex === index && activeNav && (
        <LinearGradient
          colors={["#F4F4F433", "#FFFFFF0B"]}
          className="absolute right-[30px] bg-gray-600 top-14 p-2 flex flex-col justify-center rounded-[2px] shadow-lg z-10 w-[200px] h-[110px]"
        >
          <Text
            onPress={() => {
              if (activeNav === "requests") {
                router.navigate(`/(others)/(manager-pages)/${item.uuid}`);
              } else {
                "";
              }
            }}
            className="text-white text-[15px] z-50 font-bold w-full"
          >
            View Details
          </Text>
          <Text className="text-white text-[15px] z-50 py-4 font-bold w-full">
            Block Member
          </Text>
          <Text className="text-white text-[15px] z-50 font-bold w-full">
            Delete
          </Text>
        </LinearGradient>
      )}
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-[#1d2128]">
      <View className="flex flex-row items-center justify-center gap-8 pt-10 pb-2">
        {["Members", "Requests"].map((text, i) => (
          <TouchableOpacity
            className={`border-b-[3px] pb-1 ease-in-out duration-500 ${
              activeNav === text.toLowerCase()
                ? "border-primary"
                : "border-transparent"
            }`}
            onPress={() => setActiveNav(text.toLowerCase())}
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
          <Search className="absolute top-3 left-3" />
        </View>
        <View>
          <Filter />
        </View>
      </View>
      <View className="px-4">
        <CustomButton title="Add members" onPress={onSubmit} />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 75 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <MemberItem item={item} index={index} key={index} />
            ))
          ) : (
            <Text className="text-white text-center pt-5">
              {activeNav === "members"
                ? "No members for now..."
                : "No requests yet..."}
            </Text>
          )}
        </View>
      </ScrollView>
      <InviteModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Community;
