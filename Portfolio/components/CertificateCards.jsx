import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

//Data
import { certificates } from "@/data/certificates";

//Ícones
import { Googlecloud } from "@styled-icons/simple-icons/Googlecloud";
import { Google } from "@styled-icons/simple-icons/Google";
import { Tryhackme } from "@styled-icons/simple-icons/Tryhackme";
import { Hackthebox } from "@styled-icons/simple-icons/Hackthebox";
import { Cisco } from "@styled-icons/simple-icons/Cisco";
import { Ibm } from "@styled-icons/simple-icons/Ibm";
import { Duolingo } from "@styled-icons/simple-icons/Duolingo";
import { Tree } from "@styled-icons/boxicons-solid/Tree";
import { MortarboardFill } from "@styled-icons/bootstrap/MortarboardFill";
import { ShieldLockFill } from "@styled-icons/bootstrap/ShieldLockFill";
import { WorkspacePremium } from "@styled-icons/material-outlined/WorkspacePremium";
import { PatchCheckFill } from "@styled-icons/bootstrap/PatchCheckFill";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { BoxArrowUpRight } from "@styled-icons/bootstrap/BoxArrowUpRight";

// The light theme swaps `title` (green) and `branding` (near-black), so `colors.title`
// would render a low-contrast green on the light card background. `ink` picks whichever
// token is the high-contrast text colour in the active theme.
const ink = (props) => (props.theme.name === "light" ? props.theme.colors.branding : props.theme.colors.title);

// Full-colour artwork under public/svg/ is served as a file rather than inlined: these are
// traced logos of 60-140 KB whose ids and fills would otherwise leak into the page.
// `tile` fills the whole badge, for logos that ship their own background plate.
const brandImage = (src, tile = false) => {
	const BrandImage = () => <img src={src} alt="" className={tile ? "tile" : undefined} />;
	return BrandImage;
};

const EarthIcon = brandImage("/svg/earth.svg");
const ApisecLogo = brandImage("/svg/apisec.svg", true);
const SecurityPlusLogo = brandImage("/svg/security-plus.svg", true);
// cropped to the crest and downscaled from the full-size artwork; the Harvard crest keeps its
// alpha channel so it sits on the badge plate, the Imperial English one carries its own white plate
const HarvardCrest = brandImage("/img/harvard-crest.png");
const ImperialEnglishCrest = brandImage("/img/imperial-english-crest.jpg", true);

// DeepLearning.AI's mark: concentric rings, each smaller and shifted up, tangent at the top.
// One evenodd path so the gaps fall through to the badge background and it stays monochrome.
const DeepLearningIcon = (props) => (
	<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
		<title>DeepLearning.AI</title>
		<path fillRule="evenodd" clipRule="evenodd" d="M12 1.5A10.5 10.5 0 1 0 12 22.5A10.5 10.5 0 1 0 12 1.5ZM12 1.5A8.7 8.7 0 1 0 12 18.9A8.7 8.7 0 1 0 12 1.5ZM12 1.5A6.9 6.9 0 1 0 12 15.3A6.9 6.9 0 1 0 12 1.5ZM12 1.5A5.1 5.1 0 1 0 12 11.7A5.1 5.1 0 1 0 12 1.5ZM12 1.5A3.3 3.3 0 1 0 12 8.1A3.3 3.3 0 1 0 12 1.5Z" />
	</svg>
);

// Brand icons where styled-icons ships one; the rest use an icon specific to what the
// credential is about, never the generic `default`:
//   comptia        -> the real Security+ badge (public/svg/security-plus.svg)
//   apisec         -> the real APIsec University logo (public/svg/apisec.svg)
//   cybertalents   -> graduation cap, it is a bootcamp "certificate of graduation"
//   stanford       -> a tree, which is Stanford's own mark
//   deeplearningai -> DeepLearning.AI's concentric rings, drawn above
//   natgeo         -> the earth illustration in public/svg/earth.svg
//   harvard        -> the Harvard crest (public/img/harvard-crest.png)
//   teaching       -> the Imperial English UK crest (public/img/imperial-english-crest.jpg)
const issuerIcons = {
	googlecloud: Googlecloud,
	google: Google,
	tryhackme: Tryhackme,
	hackthebox: Hackthebox,
	cisco: Cisco,
	ibm: Ibm,
	duolingo: Duolingo,
	comptia: SecurityPlusLogo,
	apisec: ApisecLogo,
	cybertalents: MortarboardFill,
	harvard: HarvardCrest,
	stanford: Tree,
	deeplearningai: DeepLearningIcon,
	natgeo: EarthIcon,
	grc: ShieldLockFill,
	teaching: ImperialEnglishCrest,
	default: WorkspacePremium,
};

// Fixed display order for the filter chips; categories absent from the data are dropped.
const CATEGORY_ORDER = ["cloud", "offensive", "grc", "fundamentals", "data", "languages", "other"];

const FilterRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 8px;
	width: 60%;
	margin-bottom: 30px;

	@media (max-width: 1600px) {
		width: 85%;
	}

	@media (max-width: 700px) {
		gap: 6px;
		margin-bottom: 20px;
	}
`;

const FilterChip = styled.button`
	font-family: inherit;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.4px;
	text-transform: uppercase;
	padding: 4px 12px;
	border-radius: 4px;
	transition: all 0.3s ease;
	color: ${(props) => (props.$active ? props.theme.colors.backgroundPage : props.theme.colors.inactiveTitle)};
	background-color: ${(props) => (props.$active ? props.theme.colors.branding : props.theme.colors.backgroundSecondary)};
	border: 1px solid ${(props) => (props.$active ? props.theme.colors.branding : props.theme.colors.inactiveTitle)};

	&:hover {
		cursor: pointer;
		border-color: ${(props) => props.theme.colors.branding};
		color: ${(props) => (props.$active ? props.theme.colors.backgroundPage : props.theme.colors.branding)};
	}

	&:focus-visible {
		outline: 2px solid ${(props) => props.theme.colors.branding};
		outline-offset: 2px;
	}

	@media (max-width: 700px) {
		font-size: 10px;
		padding: 3px 9px;
	}
`;

const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
	width: 60%;
	transition: all 0.3s ease;

	/* react-awesome-reveal wraps each card in a div: stretch it so a row keeps equal heights */
	> div {
		height: 100%;
	}

	@media (max-width: 1600px) {
		width: 85%;
	}

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 700px) {
		grid-template-columns: repeat(1, 1fr);
		gap: 15px;
	}
`;

const CertificateCard = styled.article`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	height: 100%;
	min-height: 200px;
	padding: 20px;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.backgroundSecondary};
	border: 1px solid ${(props) => props.theme.colors.backgroundPage};
	transition: all 0.3s ease;

	&:hover {
		border-color: ${(props) => props.theme.colors.branding};
		transform: translateY(-4px);
		/* the branding colour is near-black in the light theme, so a coloured glow would
		   read as a smudge there: fall back to a neutral drop shadow */
		box-shadow: ${(props) =>
			props.theme.name === "dark" ? `0px 0px 20px 0px ${props.theme.colors.branding}5E` : "0px 12px 24px -14px rgba(0, 0, 0, 0.5)"};
	}

	@media (max-width: 700px) {
		min-height: 0;
	}
`;

const CardHeader = styled.header`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 10px;
	width: 100%;
	margin-bottom: 14px;
`;

const IssuerBadge = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 46px;
	width: 46px;
	height: 46px;
	border-radius: 8px;
	overflow: hidden;
	background-color: ${(props) => props.theme.colors.backgroundPage};

	svg {
		width: 26px;
		height: 26px;
		color: ${(props) => props.theme.colors.branding};
	}

	/* brand artwork is a full-colour <img> instead of a theme-coloured inline icon */
	img {
		width: 26px;
		height: 26px;
		object-fit: contain;
	}

	/* logos that ship their own background plate fill the badge edge to edge */
	img.tile {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const StatusPill = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 3px 9px;
	border-radius: 100px;
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.4px;
	text-transform: uppercase;
	white-space: nowrap;
	color: ${(props) => (props.$status === "active" ? props.theme.colors.backgroundPage : props.theme.colors.inactiveTitle)};
	background-color: ${(props) => (props.$status === "active" ? props.theme.colors.branding : "transparent")};
	border: 1px ${(props) => (props.$status === "expired" ? "dashed" : "solid")}
		${(props) => (props.$status === "active" ? props.theme.colors.branding : props.theme.colors.inactiveTitle)};

	svg {
		width: 12px;
		height: 12px;
	}
`;

const CertTitle = styled.h3`
	color: ${ink};
	font-size: 17px;
	font-weight: 800;
	line-height: 1.3;

	@media (max-width: 900px) {
		font-size: 16px;
	}
`;

const IssuerName = styled.p`
	margin-top: 6px;
	color: ${(props) => props.theme.colors.body};
	font-size: 13px;
	font-weight: 600;
`;

const MetaLine = styled.p`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-top: 8px;
	color: ${(props) => props.theme.colors.inactiveTitle};
	font-size: 12px;

	svg {
		min-width: 13px;
		width: 13px;
		height: 13px;
		color: ${(props) => props.theme.colors.branding};
	}
`;

const CredentialId = styled.span`
	display: block;
	margin-top: 6px;
	color: ${(props) => props.theme.colors.inactiveTitle};
	font-family: monospace;
	font-size: 11px;
	word-break: break-all;
`;

const SkillTags = styled.ul`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 6px;
	margin-top: 14px;
	list-style: none;

	li {
		padding: 3px 8px;
		border-radius: 4px;
		background-color: ${(props) => props.theme.colors.backgroundPage};
		color: ${(props) => props.theme.colors.inactiveTitle};
		font-size: 11px;
		font-weight: 700;
	}
`;

const CardFooter = styled.footer`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	margin-top: auto;
	padding-top: 16px;
`;

const VerifyLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	color: ${(props) => props.theme.colors.branding};
	font-size: 13px;
	font-weight: 700;
	text-decoration: none;
	transition: all 0.3s ease;

	svg {
		width: 13px;
		height: 13px;
	}

	&:hover {
		text-decoration: underline;
	}

	&:focus-visible {
		outline: 2px solid ${(props) => props.theme.colors.branding};
		outline-offset: 3px;
		border-radius: 2px;
	}
`;

const EmptyState = styled.p`
	color: ${(props) => props.theme.colors.inactiveTitle};
	font-size: ${(props) => props.theme.fontSizes.md};
	text-align: center;
	padding: 40px 0;
`;

// "2025-06" -> "06/2025", same MM/YYYY convention as the projects section
function formatMonth(value) {
	if (!value) return "";
	const [year, month] = value.split("-");
	return month ? `${month}/${year}` : year;
}

export default function CertificateCards() {
	const { language } = useContext(SettingsContext);
	const [filter, setFilter] = useState("all");

	const labels = language.certificatesPage;

	// a credential hosted in public/certificates/ is viewed, not verified against a registry
	const linkLabel = (certificate) => (certificate.url.startsWith("/") ? labels.viewLabel : labels.verifyLabel);

	const categories = useMemo(() => {
		const present = new Set(certificates.map((certificate) => certificate.category));
		return CATEGORY_ORDER.filter((category) => present.has(category));
	}, []);

	// most recent first; an undated (in progress) certification lands at the end
	const sortedCertificates = useMemo(() => [...certificates].sort((a, b) => (b.issuedOn || "").localeCompare(a.issuedOn || "")), []);

	const visibleCertificates = useMemo(
		() => (filter === "all" ? sortedCertificates : sortedCertificates.filter((certificate) => certificate.category === filter)),
		[filter, sortedCertificates],
	);

	return (
		<>
			<FilterRow role="group" aria-label={labels.title}>
				<FilterChip type="button" $active={filter === "all"} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
					{labels.filterAll}
				</FilterChip>
				{categories.map((category) => (
					<FilterChip
						key={category}
						type="button"
						$active={filter === category}
						aria-pressed={filter === category}
						onClick={() => setFilter(category)}>
						{labels.categories[category]}
					</FilterChip>
				))}
			</FilterRow>

			{visibleCertificates.length === 0 ? (
				<EmptyState>{labels.emptyState}</EmptyState>
			) : (
				<CardGrid>
					{visibleCertificates.map((certificate, index) => {
						const IssuerIcon = issuerIcons[certificate.icon] || issuerIcons.default;

						return (
							<Fade key={certificate.id} triggerOnce delay={Math.min(index, 5) * 100}>
								<CertificateCard>
									<CardHeader>
										<IssuerBadge>
											<IssuerIcon aria-hidden="true" />
										</IssuerBadge>
										<StatusPill $status={certificate.status}>
											{certificate.status === "active" && <PatchCheckFill aria-hidden="true" />}
											{labels.status[certificate.status]}
										</StatusPill>
									</CardHeader>

									<CertTitle>{certificate.title}</CertTitle>
									<IssuerName>{certificate.issuer}</IssuerName>

									{certificate.issuedOn && (
										<MetaLine>
											<Calendar3 aria-hidden="true" />
											{/* a cert still in progress has a target date, not an issue date */}
											{certificate.status === "inProgress" ? labels.expectedLabel : labels.issuedLabel}: {formatMonth(certificate.issuedOn)}
											{certificate.expiresOn && ` · ${labels.expiresLabel}: ${formatMonth(certificate.expiresOn)}`}
										</MetaLine>
									)}

									{certificate.credentialId && (
										<CredentialId>
											{labels.credentialLabel}: {certificate.credentialId}
										</CredentialId>
									)}

									{certificate.skills?.length > 0 && (
										<SkillTags>
											{certificate.skills.map((skill) => (
												<li key={skill}>{skill}</li>
											))}
										</SkillTags>
									)}

									{certificate.url && (
										<CardFooter>
											<VerifyLink
												href={certificate.url}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${linkLabel(certificate)}: ${certificate.title} (${certificate.issuer})`}>
												{linkLabel(certificate)}
												<BoxArrowUpRight aria-hidden="true" />
											</VerifyLink>
										</CardFooter>
									)}
								</CertificateCard>
							</Fade>
						);
					})}
				</CardGrid>
			)}
		</>
	);
}
