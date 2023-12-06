import { useRouter } from "next/router";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Model() {
  const map = useGLTF("/HUB_GF_3D.glb");
  return <primitive object={map.scene} />;
}

function locations() {
  const router = useRouter();
  const { id } = router.query;

  // fix it
  //   const { camera } = useThree();
  //   camera.position.set(0, 2, 5);
  return (
    <div>
      <h1>Location Page</h1>
      <p>Faculty ID: {id}</p>

      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[1, 2, 2]} />
        <Model />
      </Canvas>
    </div>
  );
}

export default locations;
