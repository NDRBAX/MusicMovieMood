import { LogBox, View } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import MovieScreen from "./screens/Movie";
import MusicScreen from "./screens/Music";
import WishlistScreen from "./screens/Wishlist";
import SettingsScreen from "./screens/Settings";
import LoginScreen from "./screens/Login";

// Import icons
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Menu components
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigator = () => {
  const [active, setActive] = useState(false);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == "Movie") {
            iconName = "musical-notes";
          } else if (route.name == "Music") {
            iconName = "ios-film";
          } else if (route.name == "Wishlist") {
            iconName = "ios-film";
          } else if (route.name == "Settings") {
            iconName = "ios-film";
          }
          return <Ionicons name={iconName} size={35} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#009788",
        inactiveTintColor: "#FFFFFF",
        style: {
          backgroundColor: "rgba(52, 52, 52, 0)",
        },
      }}
    >
      <Tab.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
        }}
      />

      <Tab.Screen
        name="Music"
        component={MusicScreen}
        options={{
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Music" component={MusicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
