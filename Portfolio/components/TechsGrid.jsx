import React from "react";
import styled, { keyframes } from "styled-components";
import { Fade } from "react-awesome-reveal";

//Contexto

//Ícones
import { Amazonaws } from "@styled-icons/simple-icons/Amazonaws";
import { Visualstudiocode } from "@styled-icons/simple-icons/Visualstudiocode";
import { Mongodb } from "@styled-icons/simple-icons/Mongodb";
import { Postgresql } from "@styled-icons/simple-icons/Postgresql";
import { Sqlite } from "@styled-icons/simple-icons/Sqlite";
import { Javascript } from "@styled-icons/boxicons-logos/Javascript";
import { Java } from "@styled-icons/fa-brands/Java";
import { Python } from "@styled-icons/boxicons-logos/Python";
import { Nodejs } from "@styled-icons/boxicons-logos/Nodejs";
import { Html5 } from "@styled-icons/boxicons-logos/Html5";
import { Git } from "@styled-icons/boxicons-logos/Git";
import { Oracle } from "@styled-icons/simple-icons/Oracle";
import { Mysql } from "@styled-icons/simple-icons/Mysql";
import { Linux } from "@styled-icons/fa-brands/Linux";
import { Windows } from "@styled-icons/boxicons-logos/Windows";
import { Android } from "@styled-icons/boxicons-logos/Android";
import { Ios } from "@styled-icons/simple-icons/Ios";
import { Figma } from "@styled-icons/boxicons-logos/Figma";
import { Adobephotoshop } from "@styled-icons/simple-icons/Adobephotoshop";
import { Wordpress } from "@styled-icons/boxicons-logos/Wordpress";
import { Kalilinux } from "@styled-icons/simple-icons/Kalilinux";
import { Nextcloud } from "@styled-icons/simple-icons/Nextcloud";
import { Nginx } from "@styled-icons/simple-icons/Nginx";
import { Cplusplus } from "@styled-icons/simple-icons/Cplusplus";
import { C } from "@styled-icons/simple-icons/C";
import { Gnubash } from "@styled-icons/simple-icons/Gnubash";

const scroll = keyframes`
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
`;

const TechGrid = styled.footer`
	padding-top: 30px;
	display: grid;
	gap: 18px;
	width: 100%;
	margin: auto;
`;

const Row = styled.div`
	overflow: hidden;
	width: 100%;
`;

const SlideTrack = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	min-width: max-content;
	animation: ${scroll} 26s linear infinite;
	animation-direction: ${(props) => (props.reverse ? "alternate-reverse" : "alternate")};
	will-change: transform;

	&:hover {
		animation-play-state: paused;
	}
`;

const Tech = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 90px;
	min-width: 90px;
	height: 70px;
	padding: 14px;
	border-radius: 12px;

	svg {
		width: 36px;
		height: 36px;
		color: ${(props) => props.theme.colors.body};
		transition: all 0.3s ease;
	}

	&:hover svg {
		transform: scale(1.2);
		color: ${(props) => props.theme.colors.branding};
	}

	@media (max-width: 900px) {
		width: 70px;
		min-width: 70px;
		height: 56px;
		padding: 10px;

		svg {
			width: 28px;
			height: 28px;
		}
	}
`;

const techRows = [
	[
		C,
		Cplusplus,
		Wordpress,
		Kalilinux,
		Nextcloud,
		Nginx,
		Amazonaws,
		Visualstudiocode,
		Mongodb,
		Postgresql,
		Sqlite,
		Javascript,
		Java,
	],
	[
		Python,
		Nodejs,
		Html5,
		Git,
		Oracle,
		Mysql,
		Linux,
		Gnubash,
		Windows,
		Android,
		Ios,
		Figma,
		Adobephotoshop,
	],
];

const renderTechs = (icons) =>
	icons.map((IconComponent, index) => (
		<Tech key={`${IconComponent.displayName}-${index}`}>
			<IconComponent />
		</Tech>
	));

export const TitleSection = styled.h2`
	font-weight: 700;
	color: ${(props) => props.theme.colors.branding};
	font-size: 26px;
	padding-top: 30px;
	text-align: center;

	@media (max-width: 900px) {
		font-size: 18px;
	}
`;

export default function TechsGrid(props) {
	return (
		<TechGrid>
			{techRows.map((row, rowIndex) => (
				<Fade key={`tech-row-${rowIndex}`} triggerOnce>
					<Row>
						<SlideTrack reverse={rowIndex === 0}>
							{renderTechs(row)}
							{renderTechs(row)}
						</SlideTrack>
					</Row>
				</Fade>
			))}
		</TechGrid>
	);
}
