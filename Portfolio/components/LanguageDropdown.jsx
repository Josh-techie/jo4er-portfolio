import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { SettingsContext } from "@/context/SettingsContext";

const SwitchLang = styled.div`
	width: fit-content;
	text-align: left;
	cursor: pointer;
	z-index: 50;
	position: relative;
	
	&:hover {
		.lang-dropdown {
			display: block;
		}
	}

	@media (max-width: 768px) {
		width: fit-content;
	}
`;

const CurrentLang = styled.div`
	background: ${(props) => props.theme.name === 'light' 
		? 'rgba(0, 0, 0, 0.05)' 
		: 'rgba(255, 255, 255, 0.08)'};
	backdrop-filter: saturate(180%) blur(20px);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	border: 1px solid ${(props) => props.theme.name === 'light' 
		? 'rgba(0, 0, 0, 0.1)' 
		: 'rgba(255, 255, 255, 0.15)'};
	padding: 6px 8px 6px 8px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.colors.body};
	box-shadow: ${(props) => props.theme.name === 'light' 
		? '0 2px 8px rgba(0, 0, 0, 0.08)' 
		: '0 2px 8px rgba(0, 0, 0, 0.3)'};
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

	&:hover {
		transform: translateY(-1px);
		box-shadow: ${(props) => props.theme.name === 'light' 
			? '0 4px 12px rgba(0, 0, 0, 0.12)' 
			: '0 4px 12px rgba(0, 0, 0, 0.4)'};
	}

	@media (max-width: 768px) {
		padding: 8px 10px;
	}
`;

const LangFlag = styled.span`
	font-size: 20px;
	line-height: 1;
	display: inline-block;

	@media (max-width: 768px) {
		font-size: 18px;
	}
`;

const LangText = styled.p`
	display: inline-block;
	margin-left: 5px;
	vertical-align: top;
	margin-top: 2px;
	font-size: 14px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.body};

	@media (max-width: 768px) {
		font-size: 12px;
		margin-left: 3px;
	}
`;

const MenuArrow = styled.svg`
	display: inline-block;
	width: 10px;
	height: 10px;
	margin-left: 10px;
	vertical-align: top;
	margin-top: 6px;
	color: ${(props) => props.theme.colors.body};
	opacity: 0.7;
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

	@media (max-width: 768px) {
		width: 8px;
		height: 8px;
		margin-left: 6px;
		margin-top: 4px;
	}
`;

const LangDropdown = styled.div`
	position: absolute;
	top: calc(100% + 2px);
	left: 0;
	width: 100%;
	display: none;
	background: ${(props) => props.theme.name === 'light' 
		? 'rgba(0, 0, 0, 0.05)' 
		: 'rgba(255, 255, 255, 0.08)'};
	backdrop-filter: saturate(180%) blur(20px);
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	border: 1px solid ${(props) => props.theme.name === 'light' 
		? 'rgba(0, 0, 0, 0.1)' 
		: 'rgba(255, 255, 255, 0.15)'};
	border-radius: 5px;
	box-shadow: ${(props) => props.theme.name === 'light' 
		? '0 4px 12px rgba(0, 0, 0, 0.12)' 
		: '0 4px 12px rgba(0, 0, 0, 0.4)'};

	&.open {
		display: block;
	}

	@media (max-width: 768px) {
		top: calc(100% + 1px);
	}
`;

const SelectingLang = styled.div`
	padding: 3px 8px 3px 8px;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	color: ${(props) => props.theme.colors.body};
	border-radius: 5px;
	margin: 2px 4px;

	&:hover {
		background: ${(props) => props.theme.name === 'light'
			? 'rgba(255, 255, 255, 1)'
			: 'rgba(60, 60, 60, 0.9)'};
		box-shadow: ${(props) => props.theme.name === 'light'
			? '0 2px 8px rgba(0, 0, 0, 0.15)'
			: '0 2px 8px rgba(0, 0, 0, 0.5)'};
		transform: scale(1.02);
		cursor: pointer;
		z-index: 10;
	}

	&:active {
		transform: scale(0.98);
	}

	&:first-child {
		border-radius: 5px 5px 0px 0px;
	}

	&:last-child {
		border-radius: 0px 0px 5px 5px;
	}

	@media (max-width: 768px) {
		padding: 2px 4px 2px 4px;
	}
`;

export default function LanguageDropdown() {
	const { changeLanguageLocalization, language } = useContext(SettingsContext);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const languages = [
		{ id: 'enuk', name: 'EN', flag: '🇬🇧' },
		{ id: 'frfr', name: 'FR', flag: '🇫🇷' },
		{ id: 'eses', name: 'ES', flag: '🇪🇸' },
		{ id: 'itit', name: 'IT', flag: '🇮🇹' },
		{ id: 'dede', name: 'DE', flag: '🇩🇪' },
	];

	const currentLanguage = language?.id || 'frfr';
	const currentLangData = languages.find(lang => lang.id === currentLanguage) || languages[1];

	const handleLanguageChange = (langId) => {
		changeLanguageLocalization(langId);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<SwitchLang ref={dropdownRef}>
			<CurrentLang onClick={toggleDropdown}>
				<LangFlag>{currentLangData.flag}</LangFlag>
				<LangText>{currentLangData.name}</LangText>
				<MenuArrow 
					viewBox="0 0 24 24" 
					fill="none" 
					stroke="currentColor" 
					strokeWidth="2" 
					strokeLinecap="round" 
					strokeLinejoin="round"
					style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
				>
					<path d="m6 9 6 6 6-6"/>
				</MenuArrow>
			</CurrentLang>

			<LangDropdown className={isOpen ? 'open' : ''}>
				{languages.filter(lang => lang.id !== currentLanguage).map((lang) => (
					<SelectingLang key={lang.id} onClick={() => handleLanguageChange(lang.id)}>
						<LangFlag>{lang.flag}</LangFlag>
						<LangText>{lang.name}</LangText>
					</SelectingLang>
				))}
			</LangDropdown>
		</SwitchLang>
	);
}
