import React, { useState, useContext } from "react";
import styled from "styled-components";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

//Ícones
import { Home } from "@styled-icons/heroicons-solid/Home";
import { Code } from "@styled-icons/fluentui-system-regular/Code";
import { Timeline } from "@styled-icons/fluentui-system-regular/Timeline";
import { FolderBriefcase } from "@styled-icons/fluentui-system-filled/FolderBriefcase";
import { Badge } from "@styled-icons/material-outlined/Badge";
import { WorkspacePremium } from "@styled-icons/material-outlined/WorkspacePremium";
import { scrollToSection } from "./SmoothScroll";

const NavigationBar = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	width: 400px;
	height: 60px;
	border-radius: 100px;
	position: fixed;
	z-index: 10;
	bottom: 30px;
	//border: 1px solid ${(props) => props.theme.colors.branding};
	backdrop-filter: blur(16px) saturate(180%);
	-webkit-backdrop-filter: blur(16px) saturate(180%);
	background-color: #00000040;

	@media (min-width: 601px) {
		display: none;
		width: 100%;
	}

	@media (max-width: 601px) {
		width: 80%;
	}

	@media (max-width: 425px) {
		width: 95%;
	}
`;

const NavOption = styled.div`
	transition: all 0.5s ease;
	padding: 5px;
	border-radius: 50%;
	border: 1px solid ${(props) => (props.isActive ? props.theme.colors.branding : "transparent")};

	&:hover {
		cursor: pointer;
	}
	svg {
		width: 26px;
		height: 26px;
		color: ${(props) => (props.isActive ? props.theme.colors.branding : "#ccc")};
	}

	@media (max-width: 425px) {
		svg {
			width: 22px;
			height: 22px;
		}
	}
`;

export default function FloatNavigationBar(props) {
	const { language } = useContext(SettingsContext);
	const [active, setActive] = useState("#section-home");

	const navigationOptions = [
		{ href: "#section-home", Icon: Home, label: language.navbarMenu.labelHome },
		{ href: "#section-services", Icon: Code, label: language.navbarMenu.labelServices },
		{ href: "#section-a-propos", Icon: Timeline, label: language.navbarMenu.labelAboutMe },
		{ href: "#section-portifolio", Icon: FolderBriefcase, label: language.navbarMenu.labelPortifolio },
		{ href: "#section-experience", Icon: Badge, label: language.navbarMenu.labelExperience },
		{ href: "#section-certificates", Icon: WorkspacePremium, label: language.navbarMenu.labelCertificates },
	];

	return (
		<NavigationBar aria-label={language.navbarMenu.labelHome}>
			{navigationOptions.map((option) => (
				<a
					key={option.href}
					style={{ textDecoration: "none" }}
					href={option.href}
					onClick={scrollToSection}
					title={option.label}
					aria-label={option.label}
					aria-current={active == option.href ? "true" : undefined}>
					<NavOption
						className="button"
						isActive={active == option.href ? true : false}
						onClick={() => {
							setActive(option.href);
						}}>
						<option.Icon style={{ pointerEvents: "none" }} aria-hidden="true" />
					</NavOption>
				</a>
			))}
		</NavigationBar>
	);
}
