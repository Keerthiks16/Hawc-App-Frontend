import { Text, View } from "react-native";
import { Colors } from "../../constants/colors";

// This screen will receive the "route" prop from the tab navigator
const SubjectScreen = ({ route }) => {
  // We can get the name of the tab like this: route.name
  const subjectName = route.name;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.card,
        alignItems: "center",
        paddingTop: 20,
      }}
    >
      <Text style={{ color: Colors.text, fontSize: 24, fontWeight: "bold" }}>
        {subjectName} Content
      </Text>
      {/* We will add Chapter lists here later */}
    </View>
  );
};

export default SubjectScreen;
