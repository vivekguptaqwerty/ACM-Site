/* eslint-disable react-hooks/exhaustive-deps */
import "../css/Portfolio.css";

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from 'react-icons/fa';
import { BiMask, BiBrain, BiPhone } from 'react-icons/bi';
import { MdOutlineScience, MdComputer } from 'react-icons/md';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import Aboutus from "./Aboutus";
import Expertise from "./Expertise";
import Services from "./Services";
import Team from "./Team";
import Event from "./Event"
import Contactus from "./Contactus";
import NotFound from "./NotFound";
import profilePicture from '../assets/ACM.jpg';

const Portfolio = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { sectionId } = useParams();
    const sections = useMemo(() => ["aboutus", "expertise", "services", "team", "event", "contactus"], []);
    const [isCurrentSection, setIsCurrentSection] = useState(sectionId === null || sectionId === undefined ? "aboutme" : sectionId);
    const [isOpen, setIsOpen] = useState(false);

    const [threshold, setThreshold] = useState(0.4);

    const nameSection = (section) => {
        let titleBtn;

        switch (section) {
            case "aboutus":
                titleBtn = t("AboutUs");
                break;
            case "expertise":
                titleBtn = t("Expertise");
                break;
            case "services":
                titleBtn = t("Services");
                break;
            case "team":
                titleBtn = t("Team");
                break;
                case "event":
                    titleBtn = t("Event");
                    break;
            case "contactus":
                titleBtn = t("ContactUs");
                break;
            default:
                titleBtn = "Section";
                break;
        }

        return titleBtn;
    }

    const iconSectionSidebar = (section) => {
        let iconSection;

        switch (section) {
            case "aboutus":
                iconSection = <BiMask className="icon-menu-section" />
                break;
            case "expertise":
                iconSection = <BiBrain className="icon-menu-section" />
                break;
            case "services":
                iconSection = <MdOutlineScience className="icon-menu-section" />
                break;
            case "team":
                iconSection = <MdComputer className="icon-menu-section" />
                break;
                case "event":
                    iconSection = <BiPhone className="icon-menu-section" />
                    break;
            case "contactus":
                iconSection = <BiPhone className="icon-menu-section" />
                break;
            default:
                iconSection = <MdComputer className="icon-menu-section" />
                break;
        }

        return iconSection;
    }

    const sectionPart = (section) => {
        let currentSection;

        switch (section) {
            case "aboutus":
                currentSection = <Element name="aboutus" id="aboutus" key={"aboutus"}>
                    <Aboutus threshold={threshold} />
                </Element>
                break;
            case "expertise":
                currentSection = <Element name="expertise" id="expertise" key={"expertise"}>
                    <Expertise />
                </Element>
                break;
            case "services":
                currentSection = <Element name="services" id="services" key={"services"}>
                    <Services threshold={threshold} />
                </Element>
                break;
            case "team":
                currentSection = <Element name="team" id="team" key={"team"}>
                    <Team menuOpened={isOpen} threshold={threshold} />
                </Element>
                break;
                case "event":
                    currentSection = <Element name="event" id="event" key={"event"}>
                        <Event menuOpened={isOpen} threshold={threshold} />
                    </Element>
                    break;
            case "contactus":
                currentSection = <Element name="contactus" id="contactus" key={"contactus"}>
                    <Contactus threshold={threshold} />
                </Element>
                break;
            default:
                currentSection = <Element name="aboutus" id="aboutus" key={"aboutus"}>
                    <Aboutus />
                </Element>
                break;
        }

        return currentSection;
    }

    useEffect(() => {
        const setProgressBar = () => {
            if (isCurrentSection && sections.includes(isCurrentSection)) {
                gsap.registerPlugin(ScrollTrigger);
                gsap.to("progress", {
                    value: 100,
                    ease: 'none',
                    scrollTrigger: { scrub: 0.5 }
                });
            }
        }

        const setToInitialSection = () => {
            if (isCurrentSection && sections.includes(isCurrentSection)) {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', duration: 500, delay: 0 });
                }
            }
        }

        const updateThreshold = () => {
            const width = window.innerWidth;
            if (width > 1200) { // Desktop
                setThreshold(0.4);
            } else if (width > 768) { // Tablette
                setThreshold(0.2);
            } else { // Smartphone
                setThreshold(0.1);
            }
        };

        document.title = "TCET ACM";
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'auto';
        setProgressBar();
        setTimeout(setToInitialSection, 100);
        
        updateThreshold();
        window.addEventListener('resize', updateThreshold);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateThreshold);
        }
    }, []);

    useEffect(() => {
        const observerEntering = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const section = entry.target.id;
                        navigate(`/portfolio/${section}`, { replace: true });
                        setIsCurrentSection(section);
                    }
                });
            },
            { threshold: 0, rootMargin: '-10% 0px -90% 0px' }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) {
                observerEntering.observe(element);
            }
        });

        return () => {
            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    observerEntering.unobserve(element);
                }
            });
        };
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1401px)');

        const handleWindowSizeChange = () => {
            if (mediaQuery.matches && isOpen) {
                setIsOpen(false);
            }
        }

        mediaQuery.addEventListener('change', handleWindowSizeChange);

        handleWindowSizeChange();

        return () => {
            mediaQuery.removeEventListener('change', handleWindowSizeChange);
        }
    }, [isOpen]);

    useEffect(() => {

        const blockOverflowBody = () => {
            if (isOpen) {
                document.body.style.overflowY = 'hidden'
            } else {
                document.body.style.overflowY = 'auto'
            }
        }

        blockOverflowBody();
        
    }, [isOpen])

    return (
        !sections.includes(isCurrentSection) && isCurrentSection ?
            <NotFound /> :
            <div className="portfolio">
                <progress max="100" value="0" />

                <nav className={`navbar main-content${isOpen ? " blurred" : ""}`} style={{
                }} onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                    }
                }} >
                    {!isOpen ?
                        <Link
                            key={sections[0]}
                            to={sections[0]}
                            spy={true}
                            smooth={true}
                            duration={500}
                            className="link-title"
                        >
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}>
                                <img src={profilePicture} alt='Profile pic' style={{
                                    width: "40px",
                                }} />
                                <h3 className="title-portfolio">TCET ACM</h3>
                            </div>
                        </Link>
                        : <div className="link-title">
                            <img src={profilePicture} alt='Profile pic' style={{
                                width: "40px",
                            }} />
                            <h3 className="title-portfolio">TCET ACM</h3>
                        </div>}

                    <div className="navbar-desktop">
                        {sections.map((section) => (
                            <Link
                                activeClass="active"
                                key={section}
                                to={section}
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                <span className={`fontTitleBoldPortfolio sectionSpan ${isCurrentSection === section ? "active" : "default"}`}>{nameSection(section)}</span>
                            </Link>
                        ))}
                        <div style={{
                            pointerEvents: 'auto',
                           padding: "0 0 0 15px"
                        }}>
                           
                        </div>
                    </div>
                    <div className="icon-sidebar-hover" onClick={() => setIsOpen(!isOpen)}>
                        <GiHamburgerMenu className="icon-sidebar" />
                    </div>
                </nav>

                <div className="navbar-mobile">
                    <div className={`sidebar ${isOpen ? "open" : ""}`} style={{
                        height: `${window.innerHeight - 30}px`
                    }}>
                        <div style={{ display: "flex", height: "70px", width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between", margin: "20px 0 20px 0" }}>
                            <span className="title-menu">{t("portfolio.menu")}</span>
                            <div className="icon-menu-close-hover" onClick={() => setIsOpen(!isOpen)}>
                                <FaTimes className="icon-menu-close" />
                            </div>
                        </div>
                        <div style={{
                            overflow: "auto",
                            display: "flex", height: "100%", flexDirection: "column", alignItems: "center"
                        }}>
                            {sections.map((section) => (
                                <Link
                                    activeClass="active"
                                    key={section}
                                    to={section}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    className={`sectionSpanSidebar ${isCurrentSection === section ? "active" : "default"} sectionSpanDim`}
                                    onClick={() => {
                                        if (isOpen) {
                                            setIsOpen(false);
                                        }
                                    }}
                                    style={{

                                    }} >
                                    {iconSectionSidebar(section)}
                                    <span
                                        className="menu-section"
                                    >{nameSection(section)}</span>
                                </Link>
                            ))}
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            pointerEvents: 'auto',
                            marginTop: "20px",
                            marginBottom: "20px",
                        }}>
                            
                        </div>

                    </div>
                </div>

                <div className={`main-content${isOpen ? " blurred" : ""}`} style={{
                    backgroundColor: "#02020D"
                }} onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                    }
                }}>
                    {sections.map((section) => {
                        return sectionPart(section);
                    })}
                </div>
            </div>
    );
}

export default Portfolio;