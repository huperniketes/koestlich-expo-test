import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import { RootContainer, Text, SVG, Box, Image, Container } from "@coconut-xr/koestlich";
import loadYogaSync from "yoga-wasm-web"
import { PerspectiveCamera } from "three";
import imagePath from "./assets/icon.png"

const imageUrl = "./assets/icon.png";
console.log(`imP: ${imagePath}, source: ${JSON.stringify(RNImage.resolveAssetSource(imagePath))}, uri: ${imageUrl}`);

async function loadYoga() {
  return (loadYogaSync as any)()
}

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas gl={{ localClippingEnabled: true }}>
        <pointLight intensity={0.5} position={[0, 0, -1]} />
        <ambientLight intensity={0.5} />
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
        <Image url={imagePath} flexGrow={1}></Image>
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
