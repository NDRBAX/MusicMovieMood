import { LogBox, StyleSheet, TouchableOpacity, View } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import MovieScreen from "./screens/Movie";
import MusicScreen from "./screens/Music";
import WishlistScreen from "./screens/Wishlist";
import SettingsScreen from "./screens/Settings";
import LoginScreen from "./screens/Login";

//REDUX
import store from "./store";
import { Provider } from "react-redux";

// Import icons
import { Ionicons } from "@expo/vector-icons";

// Menu components
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeMovie = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Movie"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name == "Movie") {
            iconName = focused
              ? null &&
                navigation.setOptions(
                  { tabBarVisible: false },
                  {
                    tabBarButton: () => (
                      <View style={{ width: 0, height: 0 }}></View>
                    ),
                  }
                )
              : "ios-film";
          } else if (route.name == "Music") {
            iconName = focused
              ? null &&
                navigation.setOptions(
                  { tabBarVisible: false },
                  {
                    tabBarButton: () => (
                      <View style={{ width: 0, height: 0 }}></View>
                    ),
                  }
                )
              : "musical-notes";
          }
          return <Ionicons name={iconName} size={35} color={color} />;
        },
        tabBarLabel: () => {
          return null;
        },
      })}
      tabBarOptions={{
        // activeTintColor: "#009788",
        inactiveTintColor: "red",
        style: {
          backgroundColor: "transparent",
          height: 90,
          padding: 10,
        },
      }}
    >
      <Tab.Screen
        name="Movie"
        component={MovieScreen}

        // options={({ navigation }) => ({
        //   tabBarIcon: (props) => (
        //     <TouchableOpacity onPress={() => navigation.navigate("Music")}>
        //       <Ionicons name="musical-notes" size={50} color="red" />
        //     </TouchableOpacity>
        //   ),
        // })}
      />

      <Tab.Screen name="Music" component={MusicScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeMovie" component={HomeMovie} />
          {/* <Stack.Screen name="Music" component={MusicScreen} /> */}
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
