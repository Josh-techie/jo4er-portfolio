import React from "react";
import styled, { keyframes } from "styled-components";

import { Amazonaws } from "@styled-icons/simple-icons/Amazonaws";
import { GoogleCloud } from "@styled-icons/boxicons-logos/GoogleCloud";
import { Firebase } from "@styled-icons/boxicons-logos/Firebase";
import { Mongodb } from "@styled-icons/simple-icons/Mongodb";
import { Postgresql } from "@styled-icons/simple-icons/Postgresql";
import { Sqlite } from "@styled-icons/simple-icons/Sqlite";
import { Javascript } from "@styled-icons/boxicons-logos/Javascript";
import { Java } from "@styled-icons/fa-brands/Java";
import { ReactLogo } from "@styled-icons/boxicons-logos/ReactLogo";
import { Nextdotjs } from "@styled-icons/simple-icons/Nextdotjs";
import { Python } from "@styled-icons/boxicons-logos/Python";
import { Flutter } from "@styled-icons/boxicons-logos/Flutter";
import { Django } from "@styled-icons/boxicons-logos/Django";
import { Nodejs } from "@styled-icons/boxicons-logos/Nodejs";
import { LogoVercel } from "@styled-icons/ionicons-solid/LogoVercel";
import { Netlify } from "@styled-icons/simple-icons/Netlify";
import { Materialui } from "@styled-icons/simple-icons/Materialui";
import { Styledcomponents } from "@styled-icons/simple-icons/Styledcomponents";
import { Css3 } from "@styled-icons/boxicons-logos/Css3";
import { Html5 } from "@styled-icons/boxicons-logos/Html5";
import { Amazons3 } from "@styled-icons/simple-icons/Amazons3";
import { Git } from "@styled-icons/boxicons-logos/Git";
import { LogoBitbucket } from "@styled-icons/ionicons-solid/LogoBitbucket";
import { GithubOutline } from "@styled-icons/evaicons-outline/GithubOutline";
import { Api } from "@styled-icons/material-rounded/Api";
import { Oracle } from "@styled-icons/simple-icons/Oracle";
import { Bootstrap } from "@styled-icons/boxicons-logos/Bootstrap";
import { TailwindCss } from "@styled-icons/boxicons-logos/TailwindCss";
import { Mysql } from "@styled-icons/simple-icons/Mysql";
import { Linux } from "@styled-icons/fa-brands/Linux";
import { Windows } from "@styled-icons/boxicons-logos/Windows";
import { Android } from "@styled-icons/boxicons-logos/Android";
import { Ios } from "@styled-icons/simple-icons/Ios";
import { Typescript } from "@styled-icons/simple-icons/Typescript";
import { Sass } from "@styled-icons/fa-brands/Sass";
import { Jquery } from "@styled-icons/boxicons-logos/Jquery";
import { Figma } from "@styled-icons/boxicons-logos/Figma";
import { Adobephotoshop } from "@styled-icons/simple-icons/Adobephotoshop";
import { Visualstudiocode } from "@styled-icons/simple-icons/Visualstudiocode";
import { Trello } from "@styled-icons/boxicons-logos/Trello";
import { Gnubash } from "@styled-icons/simple-icons/Gnubash";

const scroll = keyframes`
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
`;

const Carrousel = styled.div`
	display: grid;
	gap: 14px;
	margin: 20px 0;
`;

const Slider = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	min-height: 88px;
	border-radius: 18px;
	background: ${(props) => props.theme.colors.backgroundSecondary};
	padding: 10px 0;

	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 0;
		height: 100%;
		width: 12%;
		pointer-events: none;
		z-index: 2;
	}

	&::before {
		left: 0;
		background: linear-gradient(to right, ${(props) => props.theme.colors.backgroundSecondary} 0%, rgba(255, 255, 255, 0) 100%);
	}

	&::after {
		right: 0;
		background: linear-gradient(to left, ${(props) => props.theme.colors.backgroundSecondary} 0%, rgba(255, 255, 255, 0) 100%);
	}
`;

const SlideTrack = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0;
	min-width: 100%;
	animation: ${scroll} 24s linear infinite alternate;
	animation-direction: ${(props) => (props.reverse ? "alternate-reverse" : "alternate")};
	will-change: transform;

	&:hover {
		animation-play-state: paused;
	}
`;

const Slide = styled.div`
	width: 88px;
	min-width: 88px;
	height: 68px;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 900px) {
		width: 70px;
		min-width: 70px;
		height: 56px;
	}
`;

const Icon = styled.div`
	svg {
		width: 32px;
		height: 32px;
		color: ${(props) => props.theme.colors.body};
		transition: all 0.3s ease;
	}

	&:hover svg {
		transform: scale(1.2);
		color: ${(props) => props.theme.colors.branding};
	}

	@media (max-width: 900px) {
		svg {
			width: 26px;
			height: 26px;
		}
	}
`;

const techIcons = [
	Adobephotoshop,
	Amazons3,
	Visualstudiocode,
	Trello,
	Oracle,
	Amazonaws,
	GoogleCloud,
	Firebase,
	Mongodb,
	Postgresql,
	Sqlite,
	Javascript,
	Java,
	ReactLogo,
	Nextdotjs,
	Python,
	Flutter,
	Django,
	Nodejs,
	LogoVercel,
	Netlify,
	Materialui,
	Styledcomponents,
	Css3,
	Html5,
	Git,
	LogoBitbucket,
	GithubOutline,
	Api,
	Bootstrap,
	TailwindCss,
	Mysql,
	Linux,
	Windows,
	Android,
	Ios,
	Typescript,
	Sass,
	Jquery,
	Figma,
	Gnubash,
];

const renderSlides = (icons) =>
	icons.map((IconComponent, index) => (
		<Slide key={`${IconComponent.displayName}-${index}`}>
			<Icon>
				<IconComponent />
			</Icon>
		</Slide>
	));

export default function SlideTechs() {
	return (
		<Carrousel>
			<Slider>
				<SlideTrack reverse={false}>
					{renderSlides(techIcons)}
					{renderSlides(techIcons)}
				</SlideTrack>
			</Slider>

			<Slider>
				<SlideTrack reverse={true}>
					{renderSlides(techIcons)}
					{renderSlides(techIcons)}
				</SlideTrack>
			</Slider>
		</Carrousel>
	);
}
