import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import Hexagon from './Hexagon';

const SatelliteBug = ({ color = '#FFFFFF', visible = false, position = [0, 0, 0] }) => {
    let navigate = useNavigate();

    const satelliteRef = useRef();

    const [hexagonColor, setHexagonColor] = useState('#252525');

    useEffect(() => {
        if (color) {
            const random = Math.random();
            const newColor = random < 0.95 ? '#252525' : color;
            setHexagonColor(newColor);
        }
    }, [color]);

    useFrame(() => {
        if (satelliteRef.current && Math.random() < 0.1) {
            satelliteRef.current.rotation.y -= 0.03;
            satelliteRef.current.rotation.z -= 0.03;
        }
    });

    return (
        <group position={position} visible={visible}>
            <Hexagon
                hexagonRef={satelliteRef}
                hexagonColor={hexagonColor}
                onClick={() => {
                    if (visible) {
                        navigate("/notfound");
                        document.body.style.cursor = "auto";
                    }
                }}
                iconPath={"/icons/not_found.svg"}
                visible={visible}
            />
            <Text
                position={[0, -0.27, 0]}
                fontSize={0.10}
                color="white"
                textAlign="center"
                fontWeight="bold"
                font="/fonts/SpaceMono-Bold.ttf"
                onClick={() => {
                    if (visible) {
                        navigate("/notfound");
                        document.body.style.cursor = "auto";
                    }
                }}
            >
                {"ERR 404"}
            </Text>
        </group>
    );
};


export default SatelliteBug;