// ==UserScript==
// @name         Initialize Option Strategy Builder
// @namespace    your-namespace
// @version      0.1
// @description  Automates the selection process in an online option strategy builder
// @author       You
// @match        https://digital.fidelity.com/ftgw/digital/options-research/option-strategy-builder
// @grant        none
// ==/UserScript==

window.addEventListener("load", () => {
	setTimeout(clickDropdownAndSelectAccount, 1500);
});

const clickDropdownAndSelectAccount = () => {
	console.log("Looking for account dropdown...");
	const accountDropdown = document.querySelector('button[id="account"]');

	if (!accountDropdown) {
		console.log("Account dropdown not found, trying again in 1 second...");
		setTimeout(clickDropdownAndSelectAccount, 1000);
		return;
	}

	// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
	accountDropdown.click();
	console.log("Clicked account dropdown");

	selectAccount();
};

const selectAccount = () => {
	const uniqueAccountTextContentEnding = "325)";
	const accountOptions = document.querySelectorAll(
		'div[role="option"], button[role="option"]',
	);

	const targetAccount = [...accountOptions].find((option) =>
		option.textContent?.includes(uniqueAccountTextContentEnding),
	);

	if (targetAccount) {
		// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
		targetAccount.click();
		console.log("Successfully selected account", targetAccount);
	} else {
		console.log(
			`Could not find account ${uniqueAccountTextContentEnding}, trying again in 2 seconds...`,
		);
		setTimeout(selectAccount, 2000);
	}
};
