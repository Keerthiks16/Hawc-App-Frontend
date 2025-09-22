import { useFrame } from "@react-three/fiber/native";
import { useRef } from "react";

// This is a simple placeholder 3D component
const Molecule = (props) => {
  const meshRef = useRef();

  // This hook animates the box on every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={"#3B82F6"} wireframe />
    </mesh>
  );
};

export default Molecule;
