import Slider from "@react-native-community/slider";
import { OrbitControls } from "@react-three/drei/native";
import { Canvas } from "@react-three/fiber/native";
import { Suspense, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import Molecule from "./Molecule"; // The placeholder 3D object

const ChemistryDemo = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [showLabels, setShowLabels] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1.0);

  return (
    <View style={styles.container}>
      {/* The 3D Viewer */}
      <View style={styles.canvasContainer}>
        <Canvas>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Suspense fallback={null}>
            <Molecule />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </View>

      {/* UI Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Labels</Text>
          <Switch
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.card}
            onValueChange={setShowLabels}
            value={showLabels}
          />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Animation Speed</Text>
          <Slider
            style={{ flex: 1, height: 40 }}
            minimumValue={0.1}
            maximumValue={5}
            step={0.1}
            value={animationSpeed}
            onValueChange={setAnimationSpeed}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.textSecondary}
            thumbTintColor={colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      overflow: "hidden",
    },
    canvasContainer: {
      height: 250,
      backgroundColor: "#000",
    },
    controlsContainer: {
      padding: 15,
    },
    controlRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    controlLabel: {
      color: colors.text,
      fontSize: 16,
    },
  });

export default ChemistryDemo;
