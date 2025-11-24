import { View, ScrollView, StyleSheet } from "react-native";
import { Layout, Text, Divider } from "@ui-kitten/components";
import Header from "./Header";

export default function HomeScreen() {
  return (
    <Layout className="flex-1">
      <Header />

      <ScrollView className="flex-1 p-5">
        <Layout style={styles.section}>
          <View className="flex flex-row justify-between">
            <Text category="h4">Most popular</Text>
            
          </View>
        </Layout>

        <Divider />
      </ScrollView>
    </Layout>
  );
}
const styles = StyleSheet.create({
  section: {
    display: "flex",
    paddingVertical: 10,
  },
});
