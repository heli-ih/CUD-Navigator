import { useGLTF } from "@react-three/drei";

export default function Map() {
  const map = useGLTF("/HUB_GF_3D.glb");

  return (
    <mesh>
      <hemisphereLight intensity={1.5} />
      <primitive
        object={map.scene}
        position={[-150, -640, 1180]}
        rotation={[Math.PI / 2.4, Math.PI / 145, 0]}
      />
    </mesh>
  );
}

useGLTF.preload("/HUB_GF_3D.glb");
