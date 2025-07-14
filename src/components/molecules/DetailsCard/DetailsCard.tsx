import { FormHeader } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { getTypographyClass } from '@/lib/typography';
import React, { FC } from 'react';

export interface Detail {
	label?: string;
	value?: React.ReactNode;
	variant?: 'default' | 'divider' | 'heading';
	className?: string;
	labelStyle?: 'normal' | 'semibold';
	tag?: {
		text: string;
		variant?: 'default' | 'subtle' | 'outline';
		className?: string;
	};
	valueClassName?: string;
	valueVariant?: 'default' | 'muted' | 'foreground';
	colSpan?: 1 | 2 | 3 | 4;
}

interface Props {
	title?: string;
	titleClassName?: string;
	description?: string;
	variant?: 'default' | 'left-aligned' | 'right-aligned' | 'stacked';
	cardStyle?: 'default' | 'borderless' | 'compact';
	gridCols?: 2 | 3 | 4;
	data: Detail[];
	className?: string;
	children?: React.ReactNode;
	childrenAtTop?: boolean;
}

const Tag: FC<{ tag: NonNullable<Detail['tag']> }> = ({ tag }) => {
	const variantClasses = {
		default: 'bg-primary-100 text-primary-700',
		subtle: 'bg-gray-100 text-gray-600',
		outline: 'border border-gray-300 text-gray-600',
	};

	return (
		<span className={cn('text-xs px-2 py-0.5 rounded ml-2 inline-block', variantClasses[tag.variant || 'default'], tag.className)}>
			{tag.text}
		</span>
	);
};

const DetailsCard: FC<Props> = ({
	title,
	data,
	variant = 'default',
	cardStyle = 'default',
	gridCols = 2,
	titleClassName,
	className,
	children,
	childrenAtTop = false,
}) => {
	const cardClasses = {
		default: 'card bg-white border rounded-lg p-6',
		borderless: 'bg-white',
		compact: 'card bg-white border rounded-lg p-4',
	};

	const gridColsClass = {
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
	};

	const getValueClasses = (detail: Detail) => {
		const variantClasses = {
			default: getTypographyClass('body-default'),
			muted: getTypographyClass('status-muted'),
			foreground: getTypographyClass('status-default'),
		};

		return cn(
			variantClasses[detail.valueVariant || 'default'],
			variant === 'right-aligned' ? 'text-right' : 'text-left',
			detail.valueClassName,
		);
	};

	return (
		<div className={cn(cardClasses[cardStyle], className)}>
			{children && childrenAtTop && <div className='w-full'>{children}</div>}

			{title && <p className={cn('text-xl font-medium mb-5', titleClassName)}>{title}</p>}

			<div className={cn('grid gap-y-4 gap-x-4', gridColsClass[gridCols])}>
				{data.map((detail, index) => {
					if (detail.variant === 'heading') {
						return (
							<div key={index} className='col-span-full'>
								<FormHeader titleClassName={detail.className} title={detail.label} variant='form-component-title' />
							</div>
						);
					}

					if (detail.variant === 'divider') {
						return <div key={index} className={cn('col-span-full h-[1px] bg-gray-200 my-6', detail.className)} />;
					}

					const labelClasses = getTypographyClass(detail.labelStyle === 'semibold' ? 'label-semibold' : 'label-default');
					const colSpanClass = detail.colSpan ? `col-span-${detail.colSpan}` : '';

					if (variant === 'stacked') {
						return (
							<div key={index} className={cn('flex flex-col space-y-0', colSpanClass, detail.className)}>
								<div className={cn(getValueClasses(detail), 'text-[#09090B] text-sm font-medium')}>{detail.label}</div>
								<div className={cn(labelClasses, 'text-muted-foreground text-sm')}>
									<span>{detail.value || '--'}</span>
									{detail.tag && <Tag tag={detail.tag} />}
								</div>
							</div>
						);
					}

					return (
						<div key={index} className={cn('grid grid-cols-2 gap-4', colSpanClass, detail.className)}>
							<div className={labelClasses}>{detail.label}</div>
							<div className={getValueClasses(detail)}>
								<span>{detail.value || '--'}</span>
								{detail.tag && <Tag tag={detail.tag} />}
							</div>
						</div>
					);
				})}
			</div>
			{children && !childrenAtTop && <div className='w-full'>{children}</div>}
		</div>
	);
};

export default DetailsCard;
