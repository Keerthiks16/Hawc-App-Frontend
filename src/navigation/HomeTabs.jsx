import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Import our NEW screen component
import SubjectScreen from "../screens/main/SubjectScreen";

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      {/* All tabs now point to SubjectScreen, which is safe */}
      <Tab.Screen name="Physics" component={SubjectScreen} />
      <Tab.Screen name="Chemistry" component={SubjectScreen} />
      <Tab.Screen name="Maths" component={SubjectScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
