import { ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { Text, Button, Divider, Toggle } from "@ui-kitten/components";
import { useState } from "react";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="p-5 pt-14 bg-orange-500 border-x flex flex-row justify-between items-center">
        <View className="items-start">
          <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>Chào mừng, Giáp</Text>
          <Text style={{color:'white',fontSize:15}}>hoangnguyengiap04@gmail.com</Text>
        </View>
        <Image
          source="https://example.com/image.jpg"
          placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
          contentFit="cover"
          style={{ width: 80, height: 80 }}
        />
      </View>

      <ScrollView className="flex-1">
        {/* Account Settings */}

        <Divider />

        {/* App Settings */}
        <View className="p-4">
          <Text category="h6" className="mb-3">
            Ứng dụng
          </Text>

          <View className="flex-row justify-between items-center py-3">
            <Text>Thông báo</Text>
            <Toggle
              checked={notificationsEnabled}
              onChange={setNotificationsEnabled}
            />
          </View>
        </View>
        <Divider />

        <View className="p-4">
          <Text category="h6" className="mb-3">
            Tài khoản
          </Text>
          <Button
            appearance="ghost"
            status="basic"
            className="justify-start mb-2"
          >
            Thông tin tài khoản
          </Button>
          <Button
            appearance="ghost"
            status="basic"
            className="justify-start mb-2"
          >
            Đổi mật khẩu
          </Button>
        </View>

        <Divider />

        {/* Support */}
        <View className="p-4">
          <Text category="h6" className="mb-3">
            Hỗ trợ
          </Text>
          <Button
            appearance="ghost"
            status="basic"
            className="justify-start mb-2"
          >
            Trung tâm trợ giúp
          </Button>
          <Button
            appearance="ghost"
            status="basic"
            className="justify-start mb-2"
          >
            Điều khoản dịch vụ
          </Button>
          <Button appearance="ghost" status="basic" className="justify-start">
            Về chúng tôi
          </Button>
        </View>

        <Divider />

        {/* Logout */}
        <View className="p-4">
          <Button status="danger" appearance="outline">
            Đăng xuất
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
