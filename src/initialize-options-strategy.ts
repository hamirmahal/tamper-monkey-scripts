// ==UserScript==
// @name         Initialize Option Strategy Builder
// @namespace    your-namespace
// @version      0.1
// @description  Automates the selection process in an online option strategy builder
// @author       You
// @match        https://digital.fidelity.com/ftgw/digital/options-research/option-strategy-builder*
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
		console.log("Found account", targetAccount);

		// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
		targetAccount.click();
		checkUrl();
	} else {
		console.log("Could not find account, trying again in 2 seconds...");
		setTimeout(selectAccount, 2000);
	}
};

const checkUrl = () => {
	const thereIsASymbol =
		location.href.includes("?symbol=") &&
		location.href.split("?symbol=")[1].trim() !== "";

	if (thereIsASymbol) {
		console.log(window.location.href, "contains a symbol");
		clickInputSymbolNextButton();
		return;
	}

	setTimeout(() => {
		checkUrl();
	}, 2000);
};

const clickInputSymbolNextButton = () => {
	const nextButton = document.querySelector(
		'button.osb-next-step.primary[aria-controls="osb_step2"]',
	);

	if (nextButton) {
		// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
		nextButton.click();
		chooseOutlook();
	} else {
		console.log("Next button not found, retrying...");
		setTimeout(clickInputSymbolNextButton, 1000);
	}
};

const chooseOutlook = () => {
	const input = document.getElementById("osb_flat");

	if (input) {
		input.click();

		console.log(`Clicked ${chooseOutlook.name} option`);
		setTimeout(clickChooseOutlookNextButton, 0);
	} else {
		console.log(`${chooseOutlook.name} option not found, retrying...`);
		setTimeout(chooseOutlook, 1000);
	}
};

const clickChooseOutlookNextButton = () => {
	const nextButton = document.querySelector(
		'button.osb-next-step.primary[aria-controls="osb_step3"]',
	);

	if (nextButton) {
		// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
		nextButton.click();

		console.log(`Clicked ${chooseOutlook.name} Next button`);
		selectStrategy();
	} else {
		console.log("Second Next button not found, retrying...");
		setTimeout(clickChooseOutlookNextButton, 1000);
	}
};

const selectStrategy = () => {
	const strategyLabel = document.querySelector(
		"label[for='strategy_sell_cash_covered_put']",
	);

	if (strategyLabel) {
		// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
		strategyLabel.click();

		console.log("Selected 'Sell cash-covered put'");
		setTimeout(clickSelectStrategyNextButton, 0);
	} else {
		console.log("Strategy option not found, retrying...");
		setTimeout(selectStrategy, 1000);
	}
};

const clickSelectStrategyNextButton = () => {
	const nextButton = document.querySelector(
		'button.osb-next-step.primary[aria-controls="osb_step4"]',
	);

	if (nextButton) {
		// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
		nextButton.click();

		console.log("Clicked Select Strategy Next button");
		selectExpirationDate();
	} else {
		console.log("Next button not found, retrying...");
		setTimeout(clickSelectStrategyNextButton, 1000);
	}
};

const selectExpirationDate = () => {
	const expirationDateDropdown = document.getElementById("osb_exp_dropdown");
	if (expirationDateDropdown) {
		expirationDateDropdown.click();
		const divContainingOptions = document.getElementById(
			"osb_contract_exp_drawer",
		);
		const firstExpiration = divContainingOptions
			? divContainingOptions.querySelector(
					// Select the first expiration date option from the dropdown
					"button[role='option']",
				)
			: null;
		if (firstExpiration) {
			// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
			firstExpiration.click();
			console.log("Selected first expiration date");
			selectStrikePrice();
		} else {
			console.log("No expiration date options found, retrying in 1 second...");
			setTimeout(selectExpirationDate, 1000);
		}
	}
};

const selectStrikePrice = () => {
	const strikePriceDropdown = document.getElementById(
		"osb_contract_strike_dropdown",
	);

	if (!strikePriceDropdown) {
		console.log("Strike price dropdown not found, retrying...");
		setTimeout(selectStrikePrice, 1000);
		return;
	}

	strikePriceDropdown.click();

	const strikePriceOptions = document.querySelectorAll(
		"#osb_contract_strike_drawer button[role='option']",
	);

	const m = Math.floor(strikePriceOptions.length / 2);
	const middleOption = strikePriceOptions[m];
	if (middleOption) {
		// @ts-expect-error `Property 'click' does not exist on type 'Element'. ts(2339)`
		middleOption.click();
		console.log(`Selected Strike price $${middleOption.textContent?.trim()}`);
		selectLimitPrice();
	}
};

const selectLimitPrice = () => {
	const limitPriceDropdown = document.getElementById(
		"osb-osb_contract_limitPrice",
	);

	if (!limitPriceDropdown) {
		console.log("Limit price dropdown not found, retrying...");
		setTimeout(selectLimitPrice, 1000);
		return;
	}

	limitPriceDropdown.click();
	selectBidPrice();
};

const selectBidPrice = () => {
	const bidPrice = document.getElementById("limit-price-dropdown-bid-price");
	if (!bidPrice) {
		console.log("Bid price element not found, retrying...");
		setTimeout(selectLimitPrice, 1000);
		return;
	}

	bidPrice.click();
};
