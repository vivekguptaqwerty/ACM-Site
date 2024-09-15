import "../css/Skills.css";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { textVariant, slideIn } from "../utils/motion";
import SkillModal from "../components/SkillModal";

const Skills = () => {
    const { t } = useTranslation();

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: 0.05
    });

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const setOverflowBody = () => {
            if (selectedSkill === null) {
                document.body.style.overflowY = "auto";
            } else {
                document.body.style.overflowY = "hidden";
            }
        }

        setOverflowBody();
    }, [selectedSkill]);

    const skills = [
        "Zephyr",
        "Technical Seminars",
        "Industrial Visit",
        "Hackathons",
        "Ezine",
        "Innovation",
        "Leadership",
        "Collaboration",
        "Development",
    ];

    const contentSkills = [
        
    ];

    return (
        <>
            <div style={{
                display: "flex",
                width: "100%",
                backgroundClip: "padding-box",
                border: "1px solid rgba(2, 2, 13, 1)",
            }}>
                <div className="skills">
                    <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="skills-content">
                        <div className="container-left">
                            <div className="skills-title">
                                {t("skills.title")}
                                <p>{t("skills.subtitle")}</p>
                            </div>
                            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={slideIn("left", "tween", 0.2, 1)} className="container-left-midle">
                                <div className="circle" />
                                <TagCloud
                                    className="tagcloud-skill"
                                    options={(w, TagCloudOptions) => ({
                                        radius: Math.min(800, windowWidth, 800) / 2.5,
                                    })}
                                    onClick={(tag, ev) => setSelectedSkill(tag)}
                                >
                                    {skills}
                                </TagCloud>
                            </motion.div>
                        </div>
                        <div className="container-middle">
                            <div>
                                {contentSkills.map((skill, index) => {
                                    return (
                                        <div key={index} className="container-in-middle">
                                            <div className="container-in-in-midle">
                                                <h2 className="fontBodyBoldSkills">{skill.title}</h2>
                                                <p className="fontBodyNormalSkills" dangerouslySetInnerHTML={{ __html: skill.content.replace(/\n/g, '<br>') }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {selectedSkill && (
                <motion.div
                    className="overlay-animated-item-skill"
                    layoutId={"backgroundSkill"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }} />
            )}
            {selectedSkill && (<SkillModal skill={selectedSkill} setSelectedSkill={setSelectedSkill} t={t} />)}
        </>
    );
};

export default Skills;