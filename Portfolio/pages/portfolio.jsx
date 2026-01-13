import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Fade } from "react-awesome-reveal";

//Context
import { SettingsContext } from "@/context/SettingsContext";

//Styled-components
import { TitleSection, ContainerTitleSection, TitleH3, BodyText } from "@/styles/ui";

//Ícones
import { Robot } from "@styled-icons/fa-solid/Robot";
import { GithubOutline } from "@styled-icons/evaicons-outline/GithubOutline";
import { Java } from "@styled-icons/fa-brands/Java";
import { Mongodb } from "@styled-icons/simple-icons/Mongodb";
import { Sqlite } from "@styled-icons/simple-icons/Sqlite";
import { Javascript } from "@styled-icons/boxicons-logos/Javascript";
import { ReactLogo } from "@styled-icons/boxicons-logos/ReactLogo";
import { Nextdotjs } from "@styled-icons/simple-icons/Nextdotjs";
import { Python } from "@styled-icons/boxicons-logos/Python";
import { Nodejs } from "@styled-icons/boxicons-logos/Nodejs";
import { Css3 } from "@styled-icons/boxicons-logos/Css3";
import { Html5 } from "@styled-icons/boxicons-logos/Html5";
import { Live } from "@styled-icons/fluentui-system-filled/Live";
import { CPlusPlus } from "@styled-icons/boxicons-logos";
import { FileBinary } from "@styled-icons/bootstrap";
import { Vuejs } from "@styled-icons/boxicons-logos";
import { Markdown } from "@styled-icons/boxicons-logos";
import { BookmarkFill } from "@styled-icons/bootstrap";
import { Github } from "@styled-icons/boxicons-logos";
import { MathFormatLinear } from "@styled-icons/fluentui-system-filled";
import { DrawShape } from "@styled-icons/fluentui-system-filled";
import { Gamepad } from "styled-icons/fa-solid";
import { Password } from "@styled-icons/fluentui-system-filled/Password";
import { ShieldLockFill } from "@styled-icons/bootstrap";
import { TrophyFill } from "@styled-icons/bootstrap";
import { C } from "@styled-icons/simple-icons";
import { Box } from "@styled-icons/bootstrap";
import { DesignIdeas } from "@styled-icons/fluentui-system-filled";
import { JournalBookmark } from "@styled-icons/bootstrap";

//Custom components
import Tooltip from "@/components/Tooltip";
import FetchData from "@/components/RepositoryList";
import projectsStatic from "@/data/projects";

const ContainerGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: 60%;
	gap: 20px;
	transition: all 0.3s ease;

	@media (max-width: 1600px) {
		width: 85%;
	}

	@media (max-width: 900px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const WrapperProjectCard = styled.div`
	position: relative;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
	min-height: 270px;
	background-color: ${(props) => props.theme.colors.backgroundSecondary};
	border-radius: 4px;
	padding: 20px;
	transition: all 0.3s ease;
	border: 1px solid ${(props) => props.theme.colors.backgroundPage};

	.created_at {
		color: ${(props) => props.theme.colors.inactiveTitle};
		font-size: 12px;
		position: absolute;
		bottom: 10px;
	}

	:hover {
		border: 1px solid ${(props) => props.theme.colors.branding};
		transform: scale(1.01);
		box-shadow: 0px 0px 20px 0px ${(props) => props.theme.colors.branding}5E;
		// -webkit-box-shadow: 0px 0px 40px 0px ${(props) => props.theme.colors.branding}5E;
		// -moz-box-shadow: 0px 0px 40px 0px ${(props) => props.theme.colors.branding}5E;
	}

	.title-body {
		margin-top: 50px;

		.divider {
			margin-bottom: 20px;
		}
	}
`;

const WrapperTechStack = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	height: 34px;
	width: 100%;
	margin-bottom: 10px;

	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
	}

	svg {
		width: 22px;
		height: 22px;
		margin-right: 3px;
		color: ${(props) => props.theme.colors.inactiveTitle};
		transition: all 0.3s ease;
	}

	a {
		svg {
			&:hover {
				cursor: pointer;
				color: ${(props) => props.theme.colors.branding};
			}
		}
	}
`;

const WrapperTextChip = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	position: absolute;
	top: 10px;
	right: 10px;

	div {
		span {
			//border: 1px solid ${(props) => props.theme.colors.branding};
			color: ${(props) => props.theme.colors.inactiveTitle};
			font-size: 12px;
			font-weight: 800;
			padding: 2px 8px 2px 8px;
			border-radius: 4px;
			margin-right: 3px;
			margin-left: 3px;
		}

		@media (max-width: 601px) {
			margin-bottom: 10px;
			font-size: 10px;
		}
	}

	@media (max-width: 601px) {
		display: none;
	}
`;

const ChipTechOptions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 20px;
	margin-bottom: 20px;
	//background-color: #ccc;
	width: 60%;

	svg {
		min-width: 28px;
		min-height: 28px;
		width: 28px;
		height: 28px;
		color: ${(props) => props.theme.colors.branding};
		margin-right: 10px;

		@media (max-width: 601px) {
			min-width: 18px;
			min-height: 18px;
			width: 18px;
			height: 18px;
		}
	}

	@media (max-width: 1600px) {
		width: 85%;
	}

	@media (max-width: 601px) {
		display: none;
	}
`;

const WrapperButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	position: absolute;
	right: 10px;
	bottom: 10px;
	transition: all 0.3s ease;
	a {
		//background-color: ${(props) => props.theme.colors.branding};
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		padding: 5px;
		color: ${(props) => props.theme.colors.branding};
		//border: solid 1px ${(props) => props.theme.colors.branding};
		border-radius: 4px;
		//margin-left: 3px;
	}
`;

function formatDate(dateString) {
	const originalDate = new Date(dateString);
	const day = String(originalDate.getDate()).padStart(2, "0");
	const month = String(originalDate.getMonth() + 1).padStart(2, "0");
	const year = originalDate.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;
	return formattedDate;
}

const Chip = styled.span`
	color: ${(props) => (props.active == true ? props.theme.colors.backgroundSecondary : props.theme.colors.inactiveTitle)};
	background-color: ${(props) => (props.active == true ? props.theme.colors.branding : props.theme.colors.backgroundSecondary)};
	border: 1px solid ${(props) => (props.active == true ? props.theme.colors.branding : props.theme.colors.inactiveTitle)};
	padding: 2px 7px 3px 7px;
	margin: 3px;
	border-radius: 4px;
	font-weight: 700;
	transition: all 0.3s ease;

	&:hover {
		cursor: pointer;
	}

	@media (max-width: 601px) {
		font-weight: 700;
		font-size: 10px;
	}
`;

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const LoadingText = styled.p`
	font-size: 18px;
	font-weight: bold;
	color: ${(props) => props.theme.colors.branding};
	text-align: center;
	margin-top: 20%;
	animation: ${pulse} 1.5s infinite;
`;

export const TitleSpan = styled.h3`
	z-index: 2;
	position: absolute;
	top: 0;
	left: 0;
	padding: 5px 15px 5px 10px;
	color: ${(props) => props.theme.colors.backgroundPage};
	background-color: ${(props) => props.theme.colors.branding};
	font-size: ${(props) => props.theme.fontSizes.md};
	border-radius: 4px 0 18px 0;

	@media (max-width: 900px) {
		font-size: ${(props) => props.theme.fontSizes.sm};
	}

	@media (max-width: 600px) {
		font-size: ${(props) => props.theme.fontSizes.xs};
	}
`;

const SectionPortifolio = styled.section`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
	padding-top: 60px;
`;

export default function Portifolio() {
	const { language } = useContext(SettingsContext);
	const [view, setView] = useState("grid");
	const [stack, setStack] = useState("TODOS");

	// Fetch data from my personnal GitHub account to list repositories
	const [url, setURL] = useState("https://api.github.com/users/joeseph/repos");
	const data = FetchData(url);
	// Prefer a local static projects list if provided (so user can edit `data/projects.js`)
	const projects = projectsStatic && projectsStatic.length ? projectsStatic : data;

	const topicsIcons = {
		Robot: {
			iconName: "Robot",
			icon: <Robot />,
		},
		java: {
			iconName: "Java",
			icon: <Java />,
		},
		mongodb: {
			iconName: "Mongodb",
			icon: <Mongodb />,
		},
		Sqlite: {
			iconName: "Sqlite",
			icon: <Sqlite />,
		},
		javascript: {
			iconName: "Javascript",
			icon: <Javascript />,
		},
		reactjs: {
			iconName: "Reactjs",
			icon: <ReactLogo />,
		},
		Nextdotjs: {
			iconName: "Nextdotjs",
			icon: <Nextdotjs />,
		},
		python3: {
			iconName: "Python",
			icon: <Python />,
		},
		nodejs: {
			iconName: "Nodejs",
			icon: <Nodejs />,
		},
		css: {
			iconName: "CSS",
			icon: <Css3 />,
		},
		html5: {
			iconName: "HTML5",
			icon: <Html5 />,
		},
		Live: {
			iconName: "Live",
			icon: <Live />,
		},
		cpp: {
			iconName: "C++",
			icon: <CPlusPlus />,
		},
		c: {
			iconName: "C",
			icon: <C />,
		},
		"reverse-engineering": {
			iconName: "Reverse Engineering",
			icon: <FileBinary />,
		},
		vuejs: {
			iconName: "Vuejs",
			icon: <Vuejs />,
		},
		markdown: {
			iconName: "Markdown",
			icon: <Markdown />,
		},
		Default: {
			iconName: "BookmarkFill",
			icon: <JournalBookmark />,
		},
		github: {
			iconName: "Github",
			icon: <Github />,
		},
		"github-profile": {
			iconName: "Github Profile",
			icon: <Github />,
		},
		"desmos-api": {
			iconName: "Desmos API",
			icon: <MathFormatLinear />,
		},
		"drawing-app": {
			iconName: "Drawing App",
			icon: <DrawShape />,
		},
		pillow: {
			iconName: "Pillow",
			icon: <DrawShape />,
		},
		game: {
			iconName: "Game",
			icon: <Gamepad />,
		},
		pentesting: {
			iconName: "Pentesting",
			icon: <Password />,
		},
		security: {
			iconName: "VirusTotal",
			icon: (
				<svg fill="#8b8b8b" width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
					<title>VirusTotal icon</title>
					<path d="M10.87 12L0 22.68h24V1.32H0zm10.73 8.52H5.28l8.637-8.448L5.28 3.48H21.6z" />
				</svg>
			),
		},

		challenge: {
			iconName: "Challenge",
			icon: <TrophyFill />,
		},
		"3d-printing": {
			iconName: "3D printing",
			icon: <Box />,
		},
		solidworks: {
			iconName: "Solidworks",
			icon: <DesignIdeas />,
		},
		arduino: {
			iconName: "Arduino",
			icon: (
				<svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img">
					<style>{`.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.6;}`}</style>
					<path className="a" d="M19.14,22.2a8.93,8.93,0,1,1,9.7.06" />
					<path className="a" d="M22.36,33.28a8.93,8.93,0,1,1-4.71-7.88" />
					<path className="a" d="M39.41,25.77a8.93,8.93,0,1,1-9.59-.06" />
					<path className="a" d="M21.72,18.05A4.2,4.2,0,1,1,26.44,18" />
					<path className="a" d="M17.63,33.28a4.2,4.2,0,1,1-2.22-3.7" />
					<path className="a" d="M37,29.93a4.15,4.15,0,1,1-4.84-.06" />
					<path className="a" d="M21.72,18.05,19.14,22.2" />
					<path className="a" d="M17.65,25.4l-2.24,4.18" />
					<path className="a" d="M28.84,22.26,26.44,18" />
					<path className="a" d="M29.82,25.71l2.37,4.16" />
					<path className="a" d="M37,29.93l2.38-4.16" />
					<path className="a" d="M22.31,33.28H17.68" />
				</svg>
			),
		},
		iot: {
			iconName: "IoT",
			icon: (
				<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img">
					<g clipPath="url(#clip0_525_128)" fill="currentColor">
						<path d="M5.98959 9.38299C5.59907 8.99247 5.59907 8.35931 5.98959 7.96878C6.77889 7.17948 7.71592 6.55338 8.74719 6.12621C9.77846 5.69905 10.8838 5.47919 12 5.47919C13.1162 5.47919 14.2215 5.69905 15.2528 6.12621C16.2841 6.55338 17.2211 7.17948 18.0104 7.96878C18.4009 8.3593 18.4009 8.99247 18.0104 9.38299C17.6199 9.77352 16.9867 9.77352 16.5962 9.38299C15.9926 8.77941 15.2761 8.30063 14.4874 7.97397C13.6988 7.64732 12.8536 7.47919 12 7.47919C11.1464 7.47919 10.3012 7.64732 9.51256 7.97397C8.72394 8.30063 8.00739 8.77941 7.40381 9.38299C7.01328 9.77352 6.38012 9.77352 5.98959 9.38299Z" />
						<path d="M8.50002 10.5C8.10949 10.8905 8.10949 11.5237 8.50002 11.9142C8.89054 12.3047 9.52371 12.3047 9.91423 11.9142C10.1881 11.6403 10.5133 11.423 10.8712 11.2748C11.2291 11.1265 11.6126 11.0502 12 11.0502C12.3874 11.0502 12.7709 11.1265 13.1288 11.2748C13.4867 11.423 13.8119 11.6403 14.0858 11.9142C14.4763 12.3047 15.1095 12.3047 15.5 11.9142C15.8905 11.5237 15.8905 10.8905 15.5 10.5C15.0404 10.0404 14.4947 9.67577 13.8942 9.42702C13.2936 9.17828 12.65 9.05025 12 9.05025C11.35 9.05025 10.7064 9.17828 10.1058 9.42702C9.50529 9.67577 8.95964 10.0404 8.50002 10.5Z" />
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11 16H13V19C13 20.6569 14.3431 22 16 22H18.1707C18.5825 23.1652 19.6938 24 21 24C22.6569 24 24 22.6569 24 21C24 19.3431 22.6569 18 21 18C19.6938 18 18.5825 18.8348 18.1707 20H16C15.4477 20 15 19.5523 15 19V16H17.5C21.0898 16 24 13.0899 24 9.5C24 6.2726 21.6485 3.59544 18.5648 3.08692C17.2023 1.21764 14.9937 0 12.5 0C10.5254 0 8.72799 0.764157 7.38947 2.01068C7.26046 2.00359 7.1306 2 7 2C3.13401 2 0 5.13401 0 9C0 12.866 3.13401 16 7 16H9V19C9 19.5523 8.55229 20 8 20H5.82929C5.41746 18.8348 4.30622 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24C4.30622 24 5.41746 23.1652 5.82929 22H8C9.65685 22 11 20.6569 11 19V16ZM12.5 2C10.9199 2 9.4968 2.66498 8.49233 3.7332L8.14327 4.10441L7.63778 4.04019C7.42935 4.0137 7.21651 4 7 4C4.23858 4 2 6.23858 2 9C2 11.7614 4.23858 14 7 14H17.5C19.9853 14 22 11.9853 22 9.5C22 7.15093 20.1993 5.22132 17.9037 5.0178L17.4121 4.97422L17.1477 4.55756C16.1707 3.01814 14.4539 2 12.5 2ZM4 21C4 20.4477 3.55228 20 3 20C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22C3.55228 22 4 21.5523 4 21ZM21 22C20.4477 22 20 21.5523 20 21C20 20.4477 20.4477 20 21 20C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22Z"
						/>
					</g>
					<defs>
						<clipPath id="clip0_525_128">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			),
		},
		opencv: {
			iconName: "OpenCV",
			icon: (
				<svg width={22} height={22} viewBox="-30.5 0 317 317" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid">
					<g fill="currentColor">
						<path d="M96.8988295,111.577478 C73.5242954,98.0821845 62.1282337,70.5696577 69.1139117,44.4987526 C76.0995896,18.4278475 99.725132,0.299331211 126.715719,0.299331211 C153.706306,0.299331211 177.331848,18.4278475 184.317526,44.4987526 C191.303204,70.5696577 179.907143,98.0821845 156.532609,111.577478 L138.577759,80.4787667 C147.87684,75.1099399 152.41053,64.1646434 149.631421,53.7928665 C146.852312,43.4210897 137.453373,36.20903 126.715719,36.20903 C115.978066,36.20903 106.579126,43.4210897 103.800017,53.7928665 C101.020908,64.1646434 105.554598,75.1099399 114.853679,80.4787667 L96.8988295,111.577478 Z" />
						<path
							d="M164.965719,237.292642 C141.591185,223.797348 130.195123,196.284822 137.180801,170.213917 C144.166479,144.143011 167.792022,126.014495 194.782609,126.014495 C221.773196,126.014495 245.398738,144.143011 252.384416,170.213917 C259.370094,196.284822 247.974032,223.797348 224.599498,237.292642 L206.644649,206.193931 C215.94373,200.825104 220.47742,189.879807 217.698311,179.508031 C214.919201,169.136254 205.520262,161.924194 194.782609,161.924194 C184.044955,161.924194 174.646016,169.136254 171.866907,179.508031 C169.087798,189.879807 173.621488,200.825104 182.920569,206.193931 L164.965719,237.292642 Z"
							transform="translate(194.782609, 181.653569) rotate(180.000000) translate(-194.782609, -181.653569) "
						/>
						<path d="M119.56689,177.658863 C119.56689,204.64945 101.438373,228.274992 75.3674681,235.26067 C49.296563,242.246348 21.7840362,230.850287 8.28874269,207.475752 C-5.20655084,184.101218 -1.31956641,154.57664 17.7656607,135.491413 C36.8508879,116.406186 66.3754659,112.519202 89.7499999,126.014495 L71.7951506,157.113207 C62.4960699,151.74438 50.7503199,153.290737 43.1576523,160.883405 C35.5649847,168.476072 34.0186273,180.221822 39.3874541,189.520903 C44.7562808,198.819984 55.7015774,203.353674 66.0733542,200.574565 C76.445131,197.795456 83.6571907,188.396516 83.6571907,177.658863 L119.56689,177.658863 Z" />
						<path d="M17.3292308,251.590635 C22.3764548,251.136856 27.4793311,251.141137 32.5008696,251.860334 C35.5959866,252.408294 38.8794649,253.208829 41.2040134,255.464883 C43.6398662,258.183278 44.2391973,261.959064 44.7743144,265.439465 C45.6519064,272.661405 45.5491639,279.986087 44.7743144,287.212308 C44.2563211,290.739799 43.7468896,294.549833 41.4351839,297.41806 C38.9137124,299.97806 35.1892977,300.705819 31.7731104,301.245217 C26.7301672,301.874515 21.6144482,302.020067 16.5501003,301.514916 C13.1210702,301.16388 9.54220736,300.560268 6.6226087,298.60388 C4.73471572,297.405217 3.72013378,295.290435 3.03090301,293.239866 C1.64816054,288.967492 1.47264214,284.429699 1.28428094,279.977525 C1.26287625,274.095518 1.3741806,268.153579 2.52147157,262.365753 C3.14220736,259.664482 3.89565217,256.693512 6.1773913,254.891237 C9.39237458,252.558127 13.4806689,251.993043 17.3292308,251.590635 Z M18.1640134,259.651639 C16.0406689,259.972709 13.3950502,260.148227 12.1150502,262.12602 C10.9977258,265.075585 11.0362542,268.294849 10.8093645,271.398528 C10.7023411,276.933779 10.4240803,282.520401 11.2802676,288.012843 C11.5970569,289.866488 12.2477592,292.075452 14.3068896,292.61913 C18.7719064,293.984749 23.5494314,293.753579 28.1514381,293.492441 C30.4460201,293.141405 33.4897659,292.944482 34.6070903,290.542876 C35.8870903,286.886957 35.7971906,282.939933 35.9555853,279.121338 C35.904214,273.753043 36.2038796,268.282007 34.9195987,263.029298 C34.6113712,261.162809 32.676388,260.366555 31.0367893,260.036923 C26.8072241,259.206421 22.4406689,259.309164 18.1640134,259.651639 Z M63.259398,268.320535 C66.3245485,266.372709 70.130301,266.05592 73.6663545,266.37699 C76.9669565,266.659532 80.6314381,267.781137 82.3994649,270.820602 C84.5099666,274.634916 84.6298328,279.142742 84.7753846,283.397993 C84.681204,287.77311 84.5998662,292.34087 82.793311,296.407759 C81.7616054,298.87786 79.3899666,300.496054 76.8513712,301.133913 C72.9642809,302.088562 68.6919064,302.191304 64.946087,300.641605 C62.921204,299.849632 61.5213378,298.128696 60.361204,296.36495 L60.361204,316.361204 L51.7993311,316.361204 C51.803612,299.811104 51.7907692,283.256722 51.803612,266.706622 C54.5733779,266.693779 57.3431438,266.693779 60.1086288,266.706622 C60.0144482,268.410435 59.9202676,270.109967 59.8731773,271.81806 C60.900602,270.563746 61.8552508,269.185284 63.259398,268.320535 Z" />
					</g>
				</svg>
			),
		},
	};

	function handleFilter(id) {
		setStack(id);
	}

	function handleView(event) {
		setView(event.target.id);
	}

	const array_projects = stack == "TODOS";

	return (
		<SectionPortifolio id="section-portifolio">
			{/* <ChipTechOptions>
				<Filter className="svg" />
				<Chip
					id="TODOS"
					onClick={(event) => {
						handleFilter(event.target.id);
					}}
					active={stack.includes("TODOS") ? true : false}>
					{language.portifolioPage.labelFilter}
				</Chip>

				<Chip
					id="BACKEND"
					onClick={(event) => {
						handleFilter(event.target.id);
					}}
					active={stack.includes("BACKEND") ? true : false}>
					BACKEND
				</Chip>
				<Chip
					id="WEB"
					onClick={(event) => {
						handleFilter(event.target.id);
					}}
					active={stack.includes("WEB") ? true : false}>
					WEB
				</Chip>
				<Chip
					id="MOBILE"
					onClick={(event) => {
						handleFilter(event.target.id);
					}}
					active={stack.includes("MOBILE") ? true : false}>
					MOBILE
				</Chip>
			</ChipTechOptions> */}

			<ContainerTitleSection>
				<TitleSection>{language.portifolioPage.title}</TitleSection>
			</ContainerTitleSection>
			<ContainerGrid view={view}>
				{projects ? (
					projects.map((project, index) => (
						<Fade triggerOnce key={index}>
							<WrapperProjectCard>
								<WrapperTextChip>
									<div key={index}>
										<span>{project.language}</span>
									</div>
								</WrapperTextChip>
								<TitleSpan>{project.name}</TitleSpan>

								<div className="title-body">
									<BodyText>{project.description}</BodyText>
								</div>

								<WrapperTechStack>
									<div>
										{project.topics
											? project.topics.map((topic, index) =>
													topicsIcons[topic] ? (
														<div key={index}>
															<Tooltip toolTipText={topicsIcons[topic].iconName}>{topicsIcons[topic].icon}</Tooltip>
														</div>
													) : (
														<div key={index}>
															<Tooltip toolTipText={topic}>{topicsIcons["Default"].icon}</Tooltip>
														</div>
													)
											  )
											: ""}
									</div>
									<WrapperButtons>
										{project.homepage != null && project.homepage != "" && (
											<a href={project.homepage} target="_blank" rel="noreferrer">
												<Live />
											</a>
										)}
										<a href={project.svn_url} target="_blank" rel="noreferrer">
											<GithubOutline />
										</a>
									</WrapperButtons>
								</WrapperTechStack>

								<span className="created_at">
									{language.portifolioPage.createdLabel}: {formatDate(project.created_at)}
								</span>
							</WrapperProjectCard>
						</Fade>
					))
				) : (
					<LoadingText>Loading...</LoadingText>
				)}
			</ContainerGrid>
		</SectionPortifolio>
	);
}
