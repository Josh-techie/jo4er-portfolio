import React, { useState, createContext } from "react";
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

export default function SettingsProvider({ children }) {
	const [theme, setTheme] = useState(darkTheme);
	const [languageId, setLanguageId] = useState("frfr");

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
