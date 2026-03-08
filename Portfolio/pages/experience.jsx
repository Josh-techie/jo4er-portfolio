import React, { useContext } from "react";
import styled from "styled-components";

//Custom components
import ExperienceCards from "@/components/ExperienceCards";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

//Styled-components
import { TitleSection, ContainerTitleSection } from "@/styles/ui";

const SectionExperience = styled.section`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	padding-top: 60px;
	width: 100%;
	min-height: 100vh;
`;

export default function Experience() {
	const { language } = useContext(SettingsContext);

	return (
		<SectionExperience id="section-experience">
			<ContainerTitleSection>
				<TitleSection>{language.experiencePage.title}</TitleSection>
			</ContainerTitleSection>
			<ExperienceCards />
		</SectionExperience>
	);
}
