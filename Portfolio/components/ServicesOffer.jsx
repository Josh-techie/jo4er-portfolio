import React, { useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

//Styled icons
import { MagnifyingGlass } from "@styled-icons/entypo/MagnifyingGlass";
import { WindowWrench } from "@styled-icons/fluentui-system-filled/WindowWrench";
import { ShieldKeyhole } from "@styled-icons/fluentui-system-filled/ShieldKeyhole";
import { Homeassistant } from "@styled-icons/simple-icons/Homeassistant";
import { CodeBlock } from "@styled-icons/boxicons-regular/CodeBlock";
import { Lock } from "@styled-icons/feather/Lock";
import { CheckShield } from "@styled-icons/boxicons-solid/CheckShield";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

const CardService = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 275px;
    min-width: 275px;
    padding: 20px;
    transition: all 0.3s ease;
    border: 3px solid transparent;
    flex-shrink: 0;

    svg {
        color: ${(props) => props.theme.colors.branding};
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }

    h3 {
        color: ${(props) => props.theme.colors.branding};
        font-size: 20px;
        font-weight: 900;
        margin-top: 5px;
        margin-bottom: 20px;

        @media (max-width: 900px) {
            font-size: 18px;
        }
    }

    p {
        font-size: 16px;
        color: ${(props) => props.theme.colors.body};
        font-weight: 400;
        text-align: center;
        word-wrap: break-word;

        @media (max-width: 900px) {
            font-size: 14px;
        }
    }

    @media (max-width: 425px) {
        width: 100%;
    }
`;

const ContainerScroll = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 20px;
    width: 100%;
    padding: 20px 0;
    
    /* REMOVED scroll-behavior: smooth; -> It fights with requestAnimationFrame */
    
    /* Hide scrollbar but keep scrolling functionality */
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 1200px) {
        justify-content: flex-start;
    }
`;

const ScrollWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const ScrollHint = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    pointer-events: none;
    z-index: 1;
    background: ${(props) =>
        props.theme.name === "dark"
            ? `linear-gradient(to right, ${props.theme.colors.backgroundPage} 0%, rgba(22, 22, 22, 0) 90%)`
            : `linear-gradient(to right, ${props.theme.colors.backgroundPage} 0%, rgba(255, 255, 255, 0) 90%)`};

    &.right {
        right: 0;
        background: ${(props) =>
            props.theme.name === "dark"
                ? `linear-gradient(to left, ${props.theme.colors.backgroundPage} 0%, rgba(22, 22, 22, 0) 90%)`
                : `linear-gradient(to left, ${props.theme.colors.backgroundPage} 0%, rgba(255, 255, 255, 0) 90%)`};
    }

    @media (max-width: 1200px) {
        display: none;
    }
`;

const SectionServices = styled.section`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    padding-top: 60px;
    position: relative;
`;

const PentestIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <title>hacker-solid</title>
        <g id="Layer_2" data-name="Layer 2">
            <g id="invisible_box" data-name="invisible box">
                <rect fill="none" />
            </g>
            <g id="Q3_icons" data-name="Q3 icons">
                <g>
                    <path d="M24,30a60.3,60.3,0,0,1-13-1.3L7,27.6V40.2a1.9,1.9,0,0,0,1.5,1.9l12,2.9a2.4,2.4,0,0,0,2.1-.8L24,42.5l1.4,1.7A2.1,2.1,0,0,0,27,45h.5l12-2.9A1.9,1.9,0,0,0,41,40.2V27.6l-4,1.1A60.3,60.3,0,0,1,24,30Zm-7,8c-2,0-4-1.9-4-3s2-1,4-1,4,.9,4,2S19,38,17,38Zm14,0c-2,0-4-.9-4-2s2-2,4-2,4-.1,4,1S33,38,31,38Z" />
                    <path d="M39.4,16,37.3,6.2A4,4,0,0,0,33.4,3H29.1a3.9,3.9,0,0,0-3.4,1.9L24,7.8,22.3,4.9A3.9,3.9,0,0,0,18.9,3H14.6a4,4,0,0,0-3.9,3.2L8.6,16C4.5,17.3,2,19,2,21c0,3.9,9.8,7,22,7s22-3.1,22-7C46,19,43.5,17.3,39.4,16Z" />
                </g>
            </g>
        </g>
    </svg>
);

const serviceCards = [
    { Icon: MagnifyingGlass, key: "forensique" },
    { Icon: WindowWrench, key: "reverse" },
    { Icon: ShieldKeyhole, key: "devsecops" },
    { Icon: Homeassistant, key: "domotique" },
    { Icon: CodeBlock, key: "developpement" },
    { Icon: PentestIcon, key: "pentesting" },
    { Icon: CheckShield, key: "grc" },
];

// ADJUST THIS: 60-80 is usually the sweet spot for a smooth continuous glide
const SCROLL_SPEED = 70; 
const MAX_FRAME_DELTA = 40; 

export default function _ServicesOffer() {
    const { language } = useContext(SettingsContext);
    const scrollContainerRef = useRef(null);
    const isAutoScrollRef = useRef(true);
    const scrollDirectionRef = useRef(1);
    const animationFrameRef = useRef(0);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let maxScrollLeft = 0;
        let previousTimestamp = 0;

        const updateMetrics = () => {
            if (!scrollContainer) return;
            maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        };

        const autoScroll = (timestamp) => {
            if (!scrollContainer) return;
            if (!previousTimestamp) previousTimestamp = timestamp;

            const deltaMs = Math.min(timestamp - previousTimestamp, MAX_FRAME_DELTA);
            previousTimestamp = timestamp;

            if (isAutoScrollRef.current && maxScrollLeft > 0) {
                const nextPosition =
                    scrollContainer.scrollLeft + scrollDirectionRef.current * SCROLL_SPEED * (deltaMs / 1000);

                if (nextPosition >= maxScrollLeft) {
                    scrollDirectionRef.current = -1;
                    scrollContainer.scrollLeft = maxScrollLeft;
                } else if (nextPosition <= 0) {
                    scrollDirectionRef.current = 1;
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft = nextPosition;
                }
            }

            animationFrameRef.current = window.requestAnimationFrame(autoScroll);
        };

        const handleMouseEnter = () => {
            isAutoScrollRef.current = false;
        };
        const handleMouseLeave = () => {
            isAutoScrollRef.current = true;
        };

        const handleResize = () => {
            updateMetrics();
        };

        scrollContainer.addEventListener("mouseenter", handleMouseEnter);
        scrollContainer.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", handleResize);

        updateMetrics();
        animationFrameRef.current = window.requestAnimationFrame(autoScroll);

        return () => {
            window.cancelAnimationFrame(animationFrameRef.current);
            scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
            scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <SectionServices id="section-services">
            <ScrollWrapper>
                <ScrollHint className="left" />
                <ContainerScroll ref={scrollContainerRef}>
                    {serviceCards.map((card, index) => (
                        <Fade key={`service-${card.key}`} triggerOnce delay={200 + index * 200}>
                            <CardService>
                                <card.Icon />
                                <h3>{language.servicesOffer.cards[card.key].title}</h3>
                                <p>{language.servicesOffer.cards[card.key].contentText}</p>
                            </CardService>
                        </Fade>
                    ))}
                </ContainerScroll>
                <ScrollHint className="right" />
            </ScrollWrapper>
        </SectionServices>
    );
}