import {createStackNavigator} from "react-navigation";
import List from "../screens/List.screen";
import Details from "../screens/Details.screen";

export const AppNavigator = createStackNavigator(
    {
        Home: List,
        Details: Details
    },
    {
        initialRouteName: "Home"
    }
);