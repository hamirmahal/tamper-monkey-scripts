// ==UserScript==
// @name         Auto Fit Document Width
// @author       Hamir Mahal
// @description  Automatically selects "Fit" from the zoom dropdown.
// @grant        none
// @match        https://docs.google.com/document/*
// @version      0.1
// ==/UserScript==

window.addEventListener("load", () => {
	attemptFit();
});

function attemptFit() {
	const zoomSelectButton = document.getElementById("zoomSelect");
	const mouseOptions = {
		bubbles: true,
		cancelable: true,
		view: window,
	};

	zoomSelectButton?.dispatchEvent(new MouseEvent("mousedown", mouseOptions));

	setTimeout(() => {
		const allDivOptions = document.querySelectorAll('div[role="option"]');
		const fitOption = Array.from(allDivOptions).find(
			(option) => option.textContent?.trim() === "Fit",
		);

		fitOption?.dispatchEvent(new MouseEvent("mousedown", mouseOptions));
		fitOption?.dispatchEvent(new MouseEvent("mouseup", mouseOptions));
		fitOption?.dispatchEvent(new MouseEvent("click", mouseOptions));

		console.log("Successfully selected 'Fit' from the zoom dropdown");
	}, 0);
}
