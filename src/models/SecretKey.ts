import { BaseModel } from './base';

export interface SecretKey extends BaseModel {
	readonly display_id: string;
	readonly expires_at?: string;
	readonly last_used_at: string;
	readonly name: string;
	readonly permissions: string[];
	readonly provider: string;
	readonly type: SECRET_KEY_TYPE;
}

export enum SECRET_KEY_TYPE {
	PRIVATE_KEY = 'private_key',
	PUBLISHABLE_KEY = 'publishable_key',
	INTEGRATION = 'integration',
}
