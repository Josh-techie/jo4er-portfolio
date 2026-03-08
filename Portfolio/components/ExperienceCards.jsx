import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import { SettingsContext } from "@/context/SettingsContext";
import { experiencesByLanguage } from "@/data/experiences";

const TimelineContainer = styled.div`
	position: relative;
	max-width: 1200px;
	margin: 0 auto;
	padding: 40px 20px;

	&::before {
		content: '';
		position: absolute;
		left: 30px;
		top: 0;
		bottom: 0;
		width: 4px;
		background: ${(props) => props.theme.colors.branding}33;

		@media (min-width: 768px) {
			left: 50%;
			transform: translateX(-50%);
		}
	}
`;

const TimelineItem = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	margin-bottom: 60px;

	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;
	}

	&:nth-child(even) {
		@media (min-width: 768px) {
			flex-direction: row-reverse;
		}
	}
`;

const TimelineIcon = styled.span`
	position: absolute;
	left: 24px;
	top: 0;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: ${(props) => props.theme.colors.branding};
	border: 2px solid ${(props) => props.theme.colors.branding};
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	box-shadow: ${(props) => props.theme.name === 'light' ? '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)' : '0 0 10px rgba(0, 200, 52, 0.5), 0 0 20px rgba(0, 200, 52, 0.3), 0 0 30px rgba(0, 200, 52, 0.1)'};
	animation: ${(props) => props.theme.name === 'light' ? 'none' : 'pulse 2s infinite'};
	transition: all 0.3s ease;
	transform-origin: center;

	@media (min-width: 768px) {
		left: 50%;
		transform: translateX(-50%);
	}

	@media (max-width: 767px) {
		display: none;
	}

	&:hover {
		box-shadow: ${(props) => props.theme.name === 'light' ? '0 0 15px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 0, 0, 0.2)' : '0 0 15px rgba(0, 200, 52, 0.7), 0 0 25px rgba(0, 200, 52, 0.5), 0 0 35px rgba(0, 200, 52, 0.3)'};
		transform: ${(props) => props.theme.name === 'light' ? 'translateX(-50%) scale(1.3)' : 'translateX(-50%) scale(1.3)'};
	}

	@media (min-width: 768px) {
		&:hover {
			transform: translateX(-50%) scale(1.3);
		}
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 10px rgba(0, 200, 52, 0.5), 0 0 20px rgba(0, 200, 52, 0.3), 0 0 30px rgba(0, 200, 52, 0.1);
		}
		50% {
			box-shadow: 0 0 15px rgba(0, 200, 52, 0.7), 0 0 25px rgba(0, 200, 52, 0.5), 0 0 35px rgba(0, 200, 52, 0.3);
		}
		100% {
			box-shadow: 0 0 10px rgba(0, 200, 52, 0.5), 0 0 20px rgba(0, 200, 52, 0.3), 0 0 30px rgba(0, 200, 52, 0.1);
		}
	}
`;

const DateContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	@media (min-width: 768px) {
		width: 50%;
		justify-content: ${(props) => props.isEven ? 'flex-end' : 'flex-start'};
		padding: 0 8px;
	}
`;

const DatePill = styled.div`
	background: ${(props) => props.theme.name === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
	backdrop-filter: blur(10px);
	border: 1px solid ${(props) => props.theme.name === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
	padding: 8px 16px;
	border-radius: 999px;
	display: flex;
	align-items: center;
	gap: 8px;
	color: ${(props) => props.theme.name === 'light' ? '#333333' : '#94a3b8'};
	font-size: 14px;
	font-weight: 500;

	svg {
		width: 20px;
		height: 20px;
		color: ${(props) => props.theme.colors.branding};
		
		@media (max-width: 768px) {
			width: 18px;
			height: 18px;
		}
		
		@media (max-width: 480px) {
			width: 16px;
			height: 16px;
		}
	}
`;

const ContentContainer = styled.div`
	width: 100%;

	@media (min-width: 768px) {
		width: 50%;
		text-align: ${(props) => props.isEven ? 'left' : 'right'};
		padding: 0 8px;
	}
`;

const HoverOverlay = styled.div`
	position: absolute;
	inset: 0;
	border-radius: 24px;
	background: linear-gradient(135deg, ${(props) => props.theme.colors.branding}33, transparent, ${(props) => props.theme.colors.branding}22);
	opacity: 0;
	transition: opacity 0.5s ease;
	pointer-events: none;
`;

const ExperienceCard = styled.div`
	position: relative;
	padding: 32px;
	border-radius: 24px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: ${(props) => props.theme.name === 'light' ? '#D3D3D3' : 'rgba(255, 255, 255, 0.02)'};
	backdrop-filter: blur(12px);
	transition: all 0.5s ease;
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

	&:hover {
		border-color: ${(props) => props.theme.name === 'light' ? 'rgba(0, 0, 0, 0.3)' : `${props.theme.colors.branding}80`};
		box-shadow: ${(props) => props.theme.name === 'light' ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.1)' : '0 25px 50px -12px rgba(0, 200, 52, 0.2), 0 0 20px rgba(0, 200, 52, 0.1)'};
		transform: translateY(-2px);
		
		${HoverOverlay} {
			opacity: 1;
		}
	}

	@media (min-width: 768px) {
		text-align: left;
	}
`;

const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	margin-bottom: 16px;
`;

const RoleTitle = styled.h3`
	font-size: 24px;
	font-weight: 700;
	background: linear-gradient(to right, ${(props) => props.theme.name === 'light' ? '#333333' : '#ffffff'}, ${(props) => props.theme.name === 'light' ? '#666666' : '#94a3b8'});
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
`;

const CompanyInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	color: ${(props) => props.theme.name === 'light' ? '#555555' : props.theme.colors.branding};
	font-weight: 600;

	svg {
		width: 20px;
		height: 20px;
		
		@media (max-width: 768px) {
			width: 18px;
			height: 18px;
		}
		
		@media (max-width: 480px) {
			width: 16px;
			height: 16px;
		}
	}
`;

const HighlightsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 8px;
`;

const HighlightItem = styled.div`
	display: flex;
	gap: 12px;
	align-items: flex-start;

	svg {
		width: 20px;
		height: 20px;
		color: ${(props) => props.theme.colors.branding};
		margin-top: 4px;
		shrink: 0;
		transition: transform 0.3s ease;
		
		@media (max-width: 768px) {
			width: 18px;
			height: 18px;
		}
		
		@media (max-width: 480px) {
			width: 16px;
			height: 16px;
		}
	}

	&:hover svg {
		transform: translateX(4px);
	}

	p {
		color: ${(props) => props.theme.name === 'light' ? '#666666' : '#94a3b8'};
		font-size: 14px;
		line-height: 1.6;
		transition: color 0.3s ease;

		@media (min-width: 1024px) {
			font-size: 16px;
		}
	}

	&:hover p {
		color: ${(props) => props.theme.name === 'light' ? '#333333' : '#e2e8f0'};
	}
`;

export default function ExperienceCards() {
	const { language } = useContext(SettingsContext);

	const experiences = useMemo(() => {
		const list = experiencesByLanguage?.[language?.id] || experiencesByLanguage?.frfr || [];
		return Array.isArray(list) ? list : [];
	}, [language?.id]);

	return (
		<TimelineContainer>
			{experiences.map((exp, idx) => (
				<TimelineItem key={`${exp.company}-${exp.role}-${idx}`}>
					<TimelineIcon className="tli-dot"></TimelineIcon>
					
					<DateContainer isEven={idx % 2 === 0}>
						<DatePill>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 8}}>
								<path d="M8 2v4"></path>
								<path d="M16 2v4"></path>
								<rect width="18" height="18" x="3" y="4" rx="2"></rect>
								<path d="M3 10h18"></path>
							</svg>
							{exp.period}
						</DatePill>
					</DateContainer>
					
					
					<ContentContainer isEven={idx % 2 === 0}>
						<ExperienceCard>
							<CardHeader>
								<RoleTitle>{exp.role}</RoleTitle>
								<CompanyInfo>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
										<path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
										<path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
										<path d="M10 6h4"></path>
										<path d="M10 10h4"></path>
										<path d="M10 14h4"></path>
										<path d="M10 18h4"></path>
									</svg>
									{exp.company} {exp.location && `(${exp.location})`}
								</CompanyInfo>
							</CardHeader>
							
							{exp.highlights?.length && (
								<HighlightsList>
									{exp.highlights.map((highlight, highlightIdx) => (
										<HighlightItem key={`${idx}-h-${highlightIdx}`}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path d="m9 18 6-6-6-6"></path>
											</svg>
											<p>{highlight}</p>
										</HighlightItem>
									))}
								</HighlightsList>
							)}
							
							<HoverOverlay />
						</ExperienceCard>
					</ContentContainer>
				</TimelineItem>
			))}
		</TimelineContainer>
	);
}

