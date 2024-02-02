import { useGLTF } from "@react-three/drei";

export default function Map() {
  const map = useGLTF("/HUB_GF_3D.glb");

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <primitive object={map.scene} position={[-420, -390, 600]} />
    </mesh>
  );
}

useGLTF.preload("/HUB_GF_3D.glb");
