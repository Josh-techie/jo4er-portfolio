import styled from "styled-components";

import { MailSend } from "@styled-icons/boxicons-regular/MailSend";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";
import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import { Github } from "@styled-icons/bootstrap/Github";
import { Tryhackme } from "@styled-icons/simple-icons/Tryhackme";
import { Hackthebox } from "@styled-icons/simple-icons/Hackthebox";
import { Flask } from "@styled-icons/fa-solid/Flask";

const SocialMediaContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 5px;

	@media (max-width: 600px) {
		width: 100%;
		//justify-content: space-between;
		margin-bottom: 20px;
		gap: 6px;
	}
`;

const IconLabel = styled.span`
	/* same visual language as components/Tooltip.jsx */
	position: absolute;
	bottom: 125%;
	left: 50%;
	transform: translateX(-50%);
	padding: 3px 8px;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.branding};
	color: ${(props) => props.theme.colors.background};
	font-size: 12px;
	font-weight: 900;
	white-space: nowrap;
	visibility: hidden;
	opacity: 0;
	transition: opacity 0.3s ease;
	pointer-events: none;
	z-index: 2;

	&::after {
		content: "";
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: ${(props) => props.theme.colors.branding} transparent transparent transparent;
	}
`;

const ButtonSocialMediaIcon = styled.a`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	transition: all 0.3s ease;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.backgroundSecondary};

	svg {
		color: ${(props) => props.theme.colors.branding};
		width: 24px;
		height: 24px;
		transition: all 0.3s ease;
	}

	/* invert the chip instead of fading it out: opacity on the anchor would dim the
	   label too, and the inverted state is easier to see in both themes */
	&:hover,
	&:focus-visible {
		cursor: pointer;
		background-color: ${(props) => props.theme.colors.branding};

		svg {
			color: ${(props) => props.theme.colors.backgroundSecondary};
		}

		${IconLabel} {
			visibility: visible;
			opacity: 1;
		}
	}

	&:focus-visible {
		outline: 2px solid ${(props) => props.theme.colors.branding};
		outline-offset: 3px;
	}

	&:active {
		opacity: 0.5;
	}
`;

const socialNetworks = [
	{ key: "github", label: "GitHub", href: "https://github.com/Josh-techie", Icon: Github },
	{ key: "email", label: "Email", href: "mailto:youssef.abouyahia@edu.devinci.fr", Icon: MailSend },
	{ key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/youssef-abouyahia/", Icon: LinkedinSquare, event: "linkedin-access" },
	{ key: "x", label: "X (Twitter)", href: "https://x.com/JoesephAb", Icon: Twitter },
];

// Pentest/CTF profiles, shown only where `showPentestPlatforms` is passed (whoami section)
const pentestPlatforms = [
	{ key: "tryhackme", label: "TryHackMe", href: "https://tryhackme.com/p/Jo4er", Icon: Tryhackme, event: "tryhackme-access" },
	{
		key: "hackthebox",
		label: "Hack The Box",
		href: "https://profile.hackthebox.com/profile/019f275e-a9a1-71b9-adf0-85f939c03543",
		Icon: Hackthebox,
		event: "hackthebox-access",
	},
	{
		key: "cylab",
		label: "CyLab Academy (ex-picoCTF)",
		href: "https://learn.cylabacademy.org/users/Jo4er",
		// no CyLab brand icon exists in styled-icons; a flask ("lab") is the closest stand-in.
		// Drop their real SVG in here as an inline <svg> (like the custom icons in pages/portfolio.jsx) to swap it.
		Icon: Flask,
		event: "cylab-access",
	},
];

export default function SocialNetworkRowStack({ showPentestPlatforms = false }) {
	const links = showPentestPlatforms ? [...socialNetworks, ...pentestPlatforms] : socialNetworks;

	return (
		<SocialMediaContainer>
			{links.map((link) => (
				<ButtonSocialMediaIcon
					key={link.key}
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={link.label}
					data-splitbee-event={link.event}>
					<link.Icon aria-hidden="true" />
					<IconLabel aria-hidden="true">{link.label}</IconLabel>
				</ButtonSocialMediaIcon>
			))}
		</SocialMediaContainer>
	);
}

/*

Container com as cores das techs

<SocialMediaContainer>
			<ButtonSocialMediaIcon onClick={redirectToFacebook}>
				<Facebook style={{ color: "#3C5A99" }} />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon onClick={redirectToGithub}>
				<Github style={{ color: "#818181" }} />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon onClick={redirectToEmail}>
				<MailSend style={{ color: "#DB4437" }} />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon onClick={redirectToWhatsapp}>
				<LogoWhatsapp style={{ color: "#25d366" }} />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon onClick={redirectToTelegram}>
				<Telegram style={{ color: "#0088cc" }} />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon onClick={redirectToInstagram}>
				<Instagram style={{ color: "#c13584" }} />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon onClick={redirectToLinkedin}>
				<LinkedinSquare style={{ color: "#0077b5" }} />
			</ButtonSocialMediaIcon>
		</SocialMediaContainer>
*/
