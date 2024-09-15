import { useFrame, useLoader } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useRef } from "react";
import { TextureLoader } from "three";

const CubePicture = () => {
    const cubeRef = useRef();

    const texture1 = useLoader(TextureLoader, "/pictures/ACM.jpg");
    const texture2 = useLoader(TextureLoader, "/pictures/ACM.jpg");
    const texture3 = useLoader(TextureLoader, "/pictures/ACM.jpg");
    const texture4 = useLoader(TextureLoader, "/pictures/ACM.jpg");
    const texture5 = useLoader(TextureLoader, "/pictures/ACM.jpg");
    const texture6 = useLoader(TextureLoader, "/pictures/ACM.jpg");

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.003;
            cubeRef.current.rotation.y += 0.003;
        }
    });

    return (
        <Box ref={cubeRef} rotation={[0, 0, 0]} args={[1, 1, 1]} color >
            <meshBasicMaterial attachArray="material" map={texture1} side={0} />
            <meshBasicMaterial attachArray="material" map={texture2} side={1} />
            <meshBasicMaterial attachArray="material" map={texture3} side={2} />
            <meshBasicMaterial attachArray="material" map={texture4} side={3} />
            <meshBasicMaterial attachArray="material" map={texture5} side={4} />
            <meshBasicMaterial attachArray="material" map={texture6} side={5} />
        </Box>
    );
}

export default CubePicture;