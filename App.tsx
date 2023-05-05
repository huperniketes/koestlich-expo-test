import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import {
  RootContainer,
  Image,
  Container,
} from "@coconut-xr/koestlich";
import loadYogaSync from "yoga-wasm-web";
import { PerspectiveCamera } from "three";
//@ts-ignore
import image from "./assets/icon.png";

async function loadYoga() {
  return (loadYogaSync as any)();
}

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas
        onCreated={(state) => {
          const _gl = state.gl.getContext();
          const pixelStorei = _gl.pixelStorei.bind(_gl);
          _gl.pixelStorei = function (...args) {
            const [parameter] = args;
            switch (parameter) {
              case _gl.UNPACK_FLIP_Y_WEBGL:
                return pixelStorei(...args);
            }
          };
        }}
        gl={{ localClippingEnabled: true }}
      >
        <UI />
      </Canvas>
    </View>
  );
}

function UI() {
  const ratio = useThree((s) => s.size.width / s.size.height);
  const camera = useThree((s) => s.camera as PerspectiveCamera);

  camera.position.set(ratio / 2, -0.5, 0.5);
  camera.fov = 90;
  camera.updateProjectionMatrix();

  return (
    <Suspense>
      <RootContainer
        loadYoga={loadYoga}
        width={ratio}
        height={1}
        gapColumn={0.1}
        gapRow={0.1}
        padding={0.1}
        backgroundColor="red"
        alignItems="center"
      >
        <Container width="100%" backgroundColor="blue" flexGrow={1}></Container>
        <Image url={image} height={0.2}></Image>
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
