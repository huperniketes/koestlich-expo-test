import React, { Suspense, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Image as RNImage } from 'react-native';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RootContainer, Text, SVG, Box, Image, Container } from "@coconut-xr/koestlich";
import loadYogaSync from "yoga-wasm-web"
import { PerspectiveCamera } from "three";
import image from "./assets/icon.png"
import useControls from 'r3f-native-orbitcontrols';
import { useTexture } from "@react-three/drei";

const imageUrl = "./assets/icon.png";
console.log(`imP: ${image}, source: ${JSON.stringify(RNImage.resolveAssetSource(image))}, uri: ${imageUrl}`);

async function loadYoga() {
  return (loadYogaSync as any)()
}

function
DaBox(props)
{
  const mesh = useRef(null);
  const texture = useTexture(image)
  useFrame((state, delta) => (mesh.current.rotation.y += 0.007));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
    >
      <boxGeometry args={[0.5, 0.5, 0.04]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function App() {
  const [OrbitControls, events] = useControls();

  return (
    <View style={styles.container} {...events} >
      <RNImage source={image} style={{ width: 128, height: 128 }} />
      <Canvas gl={{ localClippingEnabled: true }}>
        <pointLight intensity={0.5} position={[0, 0, -1]} />
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Suspense>
          <DaBox />
        </Suspense>
        <UI />
      </Canvas>
    </View>
  );
}

function UI() {
  const ratio = useThree((s) => s.size.width / s.size.height);
  const camera = useThree(s => s.camera as PerspectiveCamera)
  camera.position.set(ratio / 2, -0.5, 0.5)
  camera.fov = 90
  camera.updateProjectionMatrix()
  return (
    <Suspense>
      <RootContainer loadYoga={loadYoga} width={ratio} height={1} gapColumn={0.1} gapRow={0.1} padding={0.1} backgroundColor="red">
        <Container backgroundColor="blue" flexGrow={1}></Container>
        {/*
          * Move any following lines outside the comment block to test.
        <Image url={image} flexGrow={1}></Image>
        <Image url={'./assets/icon.png'} flexGrow={1}></Image>
          */}
      </RootContainer>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
