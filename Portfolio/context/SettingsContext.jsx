import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider } from "styled-components";

//Lista de temas
import { darkTheme, lightTheme } from "@/styles/Theme";

//Pacotes com textos de linguagens
import frfrJson from "@/config/localization/frfr.json";
import enukJson from "@/config/localization/enuk.json";
import esesJson from "@/config/localization/eses.json";
import ititJson from "@/config/localization/itit.json";
import dedeJson from "@/config/localization/dede.json";

export const SettingsContext = createContext({});

const listaTemas = {
	dark: darkTheme,
	light: lightTheme,
};

const listaIdiomas = {
	frfr: frfrJson,
	enuk: enukJson,
	eses: esesJson,
	itit: ititJson,
	dede: dedeJson,
};

// Map browser language codes to website language IDs
const browserLangToId = {
	"fr": "frfr",
	"fr-FR": "frfr",
	"en": "enuk",
	"en-US": "enuk",
	"en-GB": "enuk",
	"es": "eses",
	"es-ES": "eses",
	"it": "itit",
	"it-IT": "itit",
	"de": "dede",
	"de-DE": "dede",
};

function detectBrowserLanguage() {
	if (typeof navigator === "undefined") return null;
	
	// Get browser language (e.g., "fr-FR", "en-US")
	const browserLang = navigator.language || navigator.userLanguage;
	
	// Try exact match first
	if (browserLangToId[browserLang]) {
		return browserLangToId[browserLang];
	}
	
	// Try language code only (e.g., "fr" from "fr-FR")
	const langCode = browserLang?.split("-")[0];
	if (browserLangToId[langCode]) {
		return browserLangToId[langCode];
	}
	
	return null;
}

export default function SettingsProvider({ children }) {
	const [theme, setTheme] = useState(lightTheme);
	const [languageId, setLanguageId] = useState("frfr");

	// Detect browser language and theme on mount
	useEffect(() => {
		const detectedLang = detectBrowserLanguage();
		if (detectedLang && listaIdiomas[detectedLang]) {
			setLanguageId(detectedLang);
		}

		// Detect browser color scheme preference
		if (typeof window !== "undefined" && window.matchMedia) {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
			
			if (prefersLight) {
				setTheme(lightTheme);
			} else if (prefersDark) {
				setTheme(darkTheme);
			}
			// If no preference, keep default (dark)
		}
	}, []);

	function changeTheme(newTheme) {
		setTheme(listaTemas[newTheme]);
	}

	function changeLanguageLocalization(newLangId) {
		setLanguageId(newLangId);
	}

	var language = listaIdiomas[languageId] || frfrJson;

	return (
		<SettingsContext.Provider value={{ changeTheme, changeLanguageLocalization, language }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</SettingsContext.Provider>
	);
}
