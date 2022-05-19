import { LogBox, StyleSheet, TouchableOpacity, View } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import MovieScreen from "./screens/Movie";
import MusicScreen from "./screens/Music";
import WishlistScreen from "./screens/Wishlist";
import SettingsScreen from "./screens/Settings";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";

//REDUX
import store from "./store";
import { Provider } from "react-redux";

// Import icons
import { Ionicons } from "@expo/vector-icons";

// Menu components
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const HomeMovie = ({ navigation }) => {
// 	return (
// 		<Tab.Navigator
// 			screenOptions={({ route }) => ({
// 				tabBarIcon: ({ focused, color, size }) => {
// 					let iconName;

// 					if (route.name === 'Music') {
// 						iconName = focused ? 'ios-film' : 'ios-film';
// 					} else if (route.name === 'Movie') {
// 						iconName = focused ? 'musical-notes' : 'musical-notes';
// 					}

// 					// You can return any component that you like here!
// 					return <Ionicons name={iconName} size={size} color={color} />;
// 				},
// 				tabBarActiveTintColor: 'tomato',
// 				tabBarInactiveTintColor: 'gray',
// 			})}
// 		>
// 			{/* <Tab.Screen name="Music" component={MusicScreen} /> */}
// 			<Tab.Screen name="Movie" component={MovieScreen} />
// 		</Tab.Navigator>
// 	);
// };

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Music" component={MusicScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
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
