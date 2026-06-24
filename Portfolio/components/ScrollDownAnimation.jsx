import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import dynamic from "next/dynamic";

// Dynamically import lottie-react so it only runs in the browser (avoid SSR errors)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import ScrollDownLottie from "@/public/lotties/scroll-down.json";
import ScrollDownLottieLight from "@/public/lotties/scroll-down-light.json";
import { scrollToSection } from "./SmoothScroll";

const ContainerLottie = styled.div`
	width: 50px;
	height: 50px;
	max-width: 50px;
	max-height: 50px;
	transition: all 0.3s ease;
	z-index: 1;
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);

	@media (min-width: 480px) {
		width: 60px;
		height: 60px;
		max-width: 60px;
		max-height: 60px;
		bottom: 30px;
	}

	@media (min-width: 768px) {
		width: 70px;
		height: 70px;
		max-width: 70px;
		max-height: 70px;
		bottom: 35px;
	}

	@media (min-width: 1024px) {
		width: 80px;
		height: 80px;
		max-width: 80px;
		max-height: 80px;
		bottom: 40px;
	}

	/* Ensure proper aspect ratio on all devices */
	a {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* Improve touch target size for mobile */
	@media (hover: none) and (pointer: coarse) {
		min-width: 44px;
		min-height: 44px;
	}
`;

export default function ScrollDownAnimation() {
	const theme = useTheme();
	const [isStopped] = useState(false);
	const [isPaused] = useState(false);

	const lottieRef = React.useRef();

	var defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: theme.name == "dark" ? ScrollDownLottie : ScrollDownLottieLight,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<ContainerLottie>
			<a style={{ textDecoration: "none" }} href="#section-services" onClick={scrollToSection}>
				<Lottie
					ref={lottieRef}
					style={{ pointerEvents: "none", height: "100%", width: "100%" }}
					animationData={defaultOptions.animationData}
					play={!isStopped}
					pause={isPaused}
					loop={defaultOptions.loop}
					autoplay={defaultOptions.autoplay}
					rendererSettings={defaultOptions.rendererSettings}
					hover={false}
				/>
			</a>
		</ContainerLottie>
	);
}
