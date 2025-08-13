import { BaseModel } from './base';

export interface Connection extends BaseModel {
	readonly name: string;
	readonly provider_type: string;
	readonly environment_id: string;
	readonly tenant_id: string;
	readonly connection_status: CONNECTION_STATUS;
}

export enum CONNECTION_PROVIDER_TYPE {
	STRIPE = 'stripe',
	// Add more providers as needed
}

export enum CONNECTION_STATUS {
	PUBLISHED = 'published',
	DRAFT = 'draft',
	ARCHIVED = 'archived',
}
