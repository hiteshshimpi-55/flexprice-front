// =============================================================================
// PAYMENT FEATURE CONSTANTS
// =============================================================================

// =============================================================================
// PAYMENT ENUMS
// =============================================================================

export enum PAYMENT_STATUS {
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	SUCCEEDED = 'SUCCEEDED',
	FAILED = 'FAILED',
	REFUNDED = 'REFUNDED',
	PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum PAYMENT_METHOD_TYPE {
	CARD = 'CARD',
	ACH = 'ACH',
	OFFLINE = 'OFFLINE',
	CREDITS = 'CREDITS',
}

export enum PAYMENT_DESTINATION_TYPE {
	INVOICE = 'INVOICE',
}

// =============================================================================
// PAYMENT FORMATTERS
// =============================================================================

export const formatPaymentStatus = (status: string): string => {
	switch (status.toUpperCase()) {
		case PAYMENT_STATUS.PENDING:
			return 'Pending';
		case PAYMENT_STATUS.PROCESSING:
			return 'Processing';
		case PAYMENT_STATUS.SUCCEEDED:
			return 'Succeeded';
		case PAYMENT_STATUS.FAILED:
			return 'Failed';
		case PAYMENT_STATUS.REFUNDED:
			return 'Refunded';
		case PAYMENT_STATUS.PARTIALLY_REFUNDED:
			return 'Partially Refunded';
		default:
			return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
	}
};

export const formatPaymentMethodType = (type: string): string => {
	switch (type.toUpperCase()) {
		case PAYMENT_METHOD_TYPE.CARD:
			return 'Credit Card';
		case PAYMENT_METHOD_TYPE.ACH:
			return 'ACH Transfer';
		case PAYMENT_METHOD_TYPE.OFFLINE:
			return 'Offline Payment';
		case PAYMENT_METHOD_TYPE.CREDITS:
			return 'Credits';
		default:
			return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
	}
};
