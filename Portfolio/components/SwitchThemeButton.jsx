import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

//Contexto
import { SettingsContext } from "@/context/SettingsContext";

const SwitchButton = styled.div`
	margin-left: 8px;
	margin-right: 8px;

	.switch {
		position: relative;
		display: inline-block;
		width: 70px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: ${(props) => props.theme.name === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
		backdrop-filter: saturate(180%) blur(16px);
		-webkit-backdrop-filter: saturate(180%) blur(16px);
		border: 1px solid ${(props) => props.theme.name === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: ${(props) => props.theme.colors.branding};
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 50%;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(36px);
		-ms-transform: translateX(36px);
		transform: translateX(36px);
	}

	/* Icons inside the slider button */
	.slider:before {
		background-image: ${(props) => props.checked 
			? `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' aria-hidden='true' focusable='false' fill='%23ffffff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 6.797a3.191 3.191 0 0 0-3.2 3.201 3.19 3.19 0 0 0 3.2 3.199 3.19 3.19 0 0 0 3.199-3.199A3.19 3.19 0 0 0 10 6.797zm0 5.25a2.049 2.049 0 1 1 0-4.1 2.05 2.05 0 0 1 0 4.1zM15 5c-.312-.312-.883-.248-1.273.142-.39.391-.453.959-.141 1.272s.882.25 1.273-.141c.39-.39.453-.961.141-1.273zm-9.858 8.729c-.391.39-.454.959-.142 1.271s.882.25 1.273-.141c.391-.391.454-.961.142-1.273s-.883-.248-1.273.143zM5 5c-.312.312-.249.883.141 1.273.391.391.961.453 1.273.141s.249-.883-.142-1.273C5.883 4.752 5.312 4.688 5 5zm8.727 9.857c.39.391.96.455 1.273.143s.249-.883-.142-1.274-.96-.453-1.273-.141-.248.882.142 1.272zM10 4.998c.441 0 .8-.447.8-1C10.799 3.445 10.441 3 10 3c-.442 0-.801.445-.801.998 0 .553.358 1 .801 1zM10 17c.441 0 .8-.447.8-1 0-.553-.358-.998-.799-.998-.442 0-.801.445-.801.998-.001.553.357 1 .8 1zm-5-7c0-.441-.45-.8-1.003-.8-.553 0-.997.359-.997.8 0 .442.444.8.997.8C4.55 10.8 5 10.442 5 10zm12 0c0-.441-.448-.8-1.001-.8-.553 0-.999.359-.999.8 0 .442.446.8.999.8.553 0 1.001-.358 1.001-.8z'%3E%3C/path%3E%3C/svg%3E")`
			: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' aria-hidden='true' focusable='false' fill='%23000000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8 .09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89.45-.67-.04-1.63-.93-1.56z'%3E%3C/path%3E%3C/svg%3E")`
		};
		background-size: ${(props) => props.theme.name === 'light' ? '14px 14px' : '16px 16px'};
		background-repeat: no-repeat;
		background-position: center;
		background-color: ${(props) => props.theme.colors.branding};
	}
`;

const LanguageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-left: 15px;
	gap: 8px;

	@media (max-width: 900px) {
		gap: 6px;
		margin-left: 10px;
	}

	@media (max-width: 600px) {
		gap: 4px;
		margin-left: 5px;
	}

	svg {
		width: 24px;
		height: 24px;
		color: ${(props) => props.theme.colors.branding};
		transition: all 0.3s ease;

		&:hover {
			transform: scale(1.1);
		}
	}
`;

export default function SwitchThemeButton() {
	const { changeLanguageLocalization, changeTheme } = useContext(SettingsContext);
	const [checked, setChecked] = useState(false);

	function handleCheckSwitch() {
		setChecked(!checked);
		changeTheme(checked ? "dark" : "light");
	}

	return (
		<LanguageWrapper>
			<SwitchButton checked={checked}>
				<label className="switch">
					<input type="checkbox" checked={checked} onClick={handleCheckSwitch} readOnly />
					<span className="slider"></span>
				</label>
			</SwitchButton>
		</LanguageWrapper>
	);
}
