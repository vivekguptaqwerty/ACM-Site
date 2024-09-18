import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Hexagon from './Hexagon';

const Satellite = ({ color, visible, position, index }) => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const satelliteRef = useRef();

  const satelliteName = (index) => {
    let section;

    switch (index) {
      case 0:
        section = t("aboutus").toUpperCase();
        break;
      case 1:
        section = t("expertise").toUpperCase();
        break;
      case 2:
        section = t("services").toUpperCase();
        break;
      case 3:
        section = t("team").toUpperCase();
        break;
      case 4:
        section = t("satellites.contact_me").toUpperCase();
        break;
      default:
        section = "";
        break;
    }

    return section;
  }

  const satelliteIconPath = (index) => {
    let iconPath;

    switch (index) {
      case 0:
        iconPath = "/icons/about_me.svg";
        break;
      case 1:
        iconPath = "/icons/skills.svg";
        break;
      case 2:
        iconPath = "/icons/experiences.svg";
        break;
      case 3:
        iconPath = "/icons/projects.svg";
        break;
      case 4:
        iconPath = "/icons/contact_me.svg";
        break;
      default:
        iconPath = "";
        break;
    }

    return iconPath;
  }

  const onSatelliteClick = (index) => {
    let url;

    switch (index) {
      case 0:
        url = "/portfolio/aboutus";
        break;
      case 1:
        url = "/portfolio/expertise";
        break;
      case 2:
        url = "/portfolio/services";
        break;
      case 3:
        url = "/portfolio/team";
        break;
      case 4:
        url = "/portfolio/contactus";
        break;
      default:
        url = "/portfolio";
        break;
    }
    navigate(url);
  }

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.003;
      satelliteRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group position={position} visible={visible}>
      <Hexagon hexagonRef={satelliteRef} hexagonColor={color} onClick={() => {
        onSatelliteClick(index);
        if (document.body.style.cursor === "pointer") {
          document.body.style.cursor = "auto";
        }
      }} iconPath={satelliteIconPath(index)} visible={visible} />
      <Text
        position={[0, -0.27, 0]}
        fontSize={0.10}
        color="white"
        textAlign="center"
        fontWeight="bold"
        font="/fonts/SpaceMono-Bold.ttf"
        onClick={visible && (() => {
          onSatelliteClick(index);
          if (document.body.style.cursor === "pointer") {
            document.body.style.cursor = "auto";
          }
        })}
      >
        {satelliteName(index)}
      </Text>
    </group>
  );
}

export default Satellite;