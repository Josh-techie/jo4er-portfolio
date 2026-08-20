import styled from "styled-components";

import { MailSend } from "@styled-icons/boxicons-regular/MailSend";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";
import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import { Github } from "@styled-icons/bootstrap/Github";
import { Tryhackme } from "@styled-icons/simple-icons/Tryhackme";
import { Hackthebox } from "@styled-icons/simple-icons/Hackthebox";
import { FlagCheckered } from "@styled-icons/boxicons-solid/FlagCheckered";

const SocialMediaContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	@media (max-width: 600px) {
		width: 100%;
		//justify-content: space-between;
		margin-bottom: 20px;
	}
`;

const ButtonSocialMediaIcon = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 5px;
	width: 32px;
	height: 32px;
	transition: all 0.3s ease;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.backgroundSecondary};

	&:hover {
		cursor: pointer;
		opacity: 0.5;
	}

	&:active {
		opacity: 0.5;
	}

	svg {
		color: ${(props) => props.theme.colors.branding};
		width: 24px;
		height: 24px;
		transition: all 0.3s ease;

		&:hover {
			color: ${(props) => props.theme.colors.branding};
		}
	}

	@media (max-width: 600px) {
		margin-left: 3px;
		margin-right: 3px;
	}

	/* :hover {
		transform: translateY(-7px);
	} */
`;

// showPentestPlatforms exibe os perfis de CTF/pentest (usado apenas na seção "whoami")
export default function SocialNetworkRowStack({ showPentestPlatforms = false }) {
	return (
		<SocialMediaContainer>
			<ButtonSocialMediaIcon href="https://github.com/Josh-techie" target="_blank">
				<Github />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon href="mailto:youssef.abouyahia@edu.devinci.fr" target="_blank">
				<MailSend />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon href="https://www.linkedin.com/in/youssef-abouyahia/" target="_blank" data-splitbee-event="linkedin-access">
				<LinkedinSquare />
			</ButtonSocialMediaIcon>

			<ButtonSocialMediaIcon href="https://x.com/JoesephAb" target="_blank">
				<Twitter />
			</ButtonSocialMediaIcon>

			{showPentestPlatforms && (
				<>
					<ButtonSocialMediaIcon href="https://tryhackme.com/p/Jo4er" target="_blank" rel="noopener noreferrer" title="TryHackMe" aria-label="TryHackMe" data-splitbee-event="tryhackme-access">
						<Tryhackme />
					</ButtonSocialMediaIcon>

					<ButtonSocialMediaIcon
						href="https://profile.hackthebox.com/profile/019f275e-a9a1-71b9-adf0-85f939c03543"
						target="_blank"
						rel="noopener noreferrer"
						title="Hack The Box"
						aria-label="Hack The Box"
						data-splitbee-event="hackthebox-access"
					>
						<Hackthebox />
					</ButtonSocialMediaIcon>

					<ButtonSocialMediaIcon
						href="https://learn.cylabacademy.org/users/Jo4er"
						target="_blank"
						rel="noopener noreferrer"
						title="CyLab Academy (ex-picoCTF)"
						aria-label="CyLab Academy (ex-picoCTF)"
						data-splitbee-event="cylab-access"
					>
						<FlagCheckered />
					</ButtonSocialMediaIcon>
				</>
			)}
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
