import React, { useContext } from "react";
import styled from "styled-components";

//Custom components
import CertificateCards from "@/components/CertificateCards";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

//Styled-components
import { TitleSection, ContainerTitleSection } from "@/styles/ui";

const SectionCertificates = styled.section`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	padding-top: 60px;
	width: 100%;
`;

export default function Certificates() {
	const { language } = useContext(SettingsContext);

	return (
		<SectionCertificates id="section-certificates">
			<ContainerTitleSection>
				<TitleSection>{language.certificatesPage.title}</TitleSection>
			</ContainerTitleSection>
			<CertificateCards />
		</SectionCertificates>
	);
}
