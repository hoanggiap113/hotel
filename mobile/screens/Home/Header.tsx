import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Input, Layout, Text } from "@ui-kitten/components";
import { useState } from "react";
const SearchIcon = (props: any) => <Icon {...props} name="search-outline" />;
const BellIcon = (props: any) => <Icon {...props} name="bell-outline" />;
const CloseIcon = (props: any) => <Icon {...props} name="close-outline" />;
export default function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Layout style={style.container}>
        {isSearching ? (
          <Layout style={style.searchContainer}>
            <Input
              style={style.searchInput}
              placeholder="Tìm kiếm..."
              value={searchText}
              onChangeText={setSearchText}
              autoFocus={true}
              accessoryLeft={(props) => <Icon {...props} name="search" />}
            />

            <TouchableOpacity
              onPress={() => setIsSearching(false)}
              style={style.iconButton}
            >
              <CloseIcon style={style.icon} fill="#222B45" />
            </TouchableOpacity>
          </Layout>
        ) : (
          <>
            <Layout style={style.infor}>
              <Text style={style.name}>Giap</Text>
              <Text style={style.email}>hoangnguyengiap04@gmail.com</Text>
            </Layout>
            <Layout style={style.rightActions}>
              <TouchableOpacity
                onPress={() => setIsSearching(true)}
                style={style.iconButton}
              >
                <SearchIcon style={style.icon} fill="#222B45" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => console.log("Thông báo")}
                style={style.iconButton}
              >
                <View style={style.badge} />
                <BellIcon style={style.icon} fill="#222B45" />
              </TouchableOpacity>
            </Layout>
          </>
        )}
      </Layout>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    height: 60,
    marginTop: 50,
    justifyContent:'space-between'
  },
  infor: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222B45",
  },
  email: {
    fontSize: 13,
    fontWeight: "normal",
    color: "gray",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15, 
  },
  iconButton: {
    padding: 5, 
  },
  icon: {
    width: 24,
    height: 24,
  },

  searchContainer: {
    flex: 1, 
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1, 
    borderRadius: 8,
  },

  badge: {
    position: "absolute",
    right: 5,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    zIndex: 10,
  },
});
