import { ChargesForBillingPeriodOne } from '@/components/organisms/Subscription/PriceTable';
import { BILLING_PERIOD } from '@/constants/constants';
import { BILLING_MODEL, PRICE_TYPE } from '@/models/Price';
import { getAllISOCodes } from 'iso-country-currency';
import { v4 as uuidv4 } from 'uuid';

export const getCurrencyOptions = () => {
	const codes = getAllISOCodes();
	return [...codes.filter((code) => code.currency === 'USD'), ...codes.filter((code) => code.currency !== 'USD')];
};

export function getCurrencySymbol(currency: string): string {
	try {
		const info = getAllISOCodes().filter((code) => code.currency === currency.toUpperCase());
		return info[0].symbol;
	} catch (error) {
		console.error('Error getting currency symbol', error);
		return currency;
	}
}

export function getCurrencyName(currency: string): string {
	try {
		const info = getAllISOCodes().filter((code) => code.currency === currency.toUpperCase());
		return info[0].countryName;
	} catch (error) {
		console.error('Error getting currency name', error);
		return currency;
	}
}

export const formatBillingModel = (billingModel: string) => {
	switch (billingModel.toUpperCase()) {
		case BILLING_MODEL.FLAT_FEE:
			return 'Flat Fee';
		case BILLING_MODEL.PACKAGE:
			return 'Package';
		case BILLING_MODEL.TIERED:
			return 'Tiered';
		default:
			return '--';
	}
};

/**
 * Formats billing period for price display (e.g., "50rs/month", "100rs/day")
 * @param billingPeriod - The billing period to format
 * @returns The billing period in short form (day, month, year, etc.)
 */
export const formatBillingPeriodForPrice = (billingPeriod: string) => {
	switch (billingPeriod.toUpperCase()) {
		case BILLING_PERIOD.DAILY:
			return 'day';
		case BILLING_PERIOD.WEEKLY:
			return 'week';
		case BILLING_PERIOD.MONTHLY:
			return 'month';
		case BILLING_PERIOD.ANNUAL:
			return 'year';
		case BILLING_PERIOD.QUARTERLY:
			return 'quarter';
		case BILLING_PERIOD.HALF_YEARLY:
			return 'half year';
		default:
			return '--';
	}
};

/**
 * Formats billing period for sentence display (e.g., "You will be billed monthly")
 * @param billingPeriod - The billing period to format
 * @returns The billing period in adjective form (monthly, annually, etc.)
 */
export const formatBillingPeriodForDisplay = (billingPeriod: string) => {
	switch (billingPeriod.toUpperCase()) {
		case BILLING_PERIOD.DAILY:
			return 'daily';
		case BILLING_PERIOD.WEEKLY:
			return 'weekly';
		case BILLING_PERIOD.MONTHLY:
			return 'monthly';
		case BILLING_PERIOD.ANNUAL:
			return 'annually';
		case BILLING_PERIOD.QUARTERLY:
			return 'quarterly';
		case BILLING_PERIOD.HALF_YEARLY:
			return 'half-yearly';
		default:
			return '--';
	}
};

export const getPriceTypeLabel = (type: string): string => {
	switch (type.toUpperCase()) {
		case PRICE_TYPE.FIXED:
			return 'Recurring';
		case PRICE_TYPE.USAGE:
			return 'Usage Based';
		default:
			return '--';
	}
};

export const toSentenceCase = (str: string): string => {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getTotalPayableText = (
	recurringCharges: ChargesForBillingPeriodOne[],
	usageCharges: ChargesForBillingPeriodOne[],
	recurringTotal: number,
) => {
	let text = '';

	if (recurringCharges.length > 0) {
		text += `${recurringCharges[0].currency}${recurringTotal}`;
	}

	if (usageCharges.length > 0) {
		if (recurringCharges.length > 0) {
			text += ' + Usage';
		} else {
			text += 'Depends on usage';
		}
	}

	return text;
};

export const getTotalPayableInfo = (
	recurringCharges: ChargesForBillingPeriodOne[],
	usageCharges: ChargesForBillingPeriodOne[],
	recurringTotal: number,
) => {
	let text = '';

	if (recurringCharges.length > 0) {
		text += `${recurringCharges[0].currency}${recurringTotal}`;
	}

	if (usageCharges.length > 0) {
		if (recurringCharges.length > 0) {
			text += ' + Usage';
		} else {
			text += 'depending on usage';
		}
	}

	return text;
};

export const formatDateShort = (dateString: string): string => {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
	return date.toLocaleDateString('en-US', options);
};

/**
 * Generates a unique ID using Math.random()
 * @returns A unique ID
 */
export const generateUniqueId = (): string => {
	return uuidv4().replace(/-/g, '');
};
