// ==UserScript==
// @name         Auto Fit Document Width
// @namespace    your-namespace
// @version      0.1
// @description  Automatically selects "Fit" from the zoom dropdown.
// @author       You
// @match        https://docs.google.com/document/*
// @grant        none
// ==/UserScript==

window.addEventListener("load", () => {
	function attemptFit() {
		const zoomSelectButton = document.getElementById("zoomSelect");
		const mouseOptions = {
			bubbles: true,
			cancelable: true,
			view: window,
		};

		if (!zoomSelectButton) {
			console.warn("Failed to get Zoom select button. Retrying in 1 second...");
			setTimeout(attemptFit, 1000);
			return;
		}

		zoomSelectButton.dispatchEvent(new MouseEvent("mousedown", mouseOptions));

		setTimeout(() => {
			const allDivOptions = document.querySelectorAll('div[role="option"]');
			const fitOption = Array.from(allDivOptions).find(
				(option) => option.textContent?.trim() === "Fit",
			);

			if (fitOption) {
				fitOption.dispatchEvent(new MouseEvent("mousedown", mouseOptions));
				fitOption.dispatchEvent(new MouseEvent("mouseup", mouseOptions));
				fitOption.dispatchEvent(new MouseEvent("click", mouseOptions));

				console.log("Successfully selected 'Fit' from the zoom dropdown");
			} else {
				const allListOptions = document.querySelectorAll('li[role="option"]');
				const listOption = Array.from(allListOptions).find(
					(option) => option.textContent?.trim() === "Fit",
				);

				if (listOption) {
					listOption.dispatchEvent(new MouseEvent("mousedown", mouseOptions));
					listOption.dispatchEvent(new MouseEvent("mouseup", mouseOptions));
					listOption.dispatchEvent(new MouseEvent("click", mouseOptions));
					console.log("Successfully selected 'Fit' from zoom dropdown");
				} else {
					console.warn("Could not find the 'Fit' option after dropdown opened");
					console.warn(
						"You might need to inspect the dropdown's HTML structure further.",
					);
				}
			}
		}, 0);
	}

	attemptFit(); // Initial attempt after page load
});
