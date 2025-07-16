import { FC, useState } from 'react';
import { ColumnData, FlexpriceTable } from '@/components/molecules';
import { NormalizedPlan } from '@/utils/models/transformed_plan';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { FormHeader } from '@/components/atoms';
import { motion } from 'framer-motion';
import ChargeValueCell from '@/pages/product-catalog/plans/ChargeValueCell';
import { capitalize } from 'es-toolkit';

export type ChargesForBillingPeriod = NormalizedPlan['charges'][string][string];
export type ChargesForBillingPeriodOne = ChargesForBillingPeriod[0];

export interface Props {
	data: ChargesForBillingPeriod;
}

type ChargeTableData = {
	charge: string;
	quantity: string;
	price: JSX.Element;
	invoice_cadence: string;
};

const ChargeTable: FC<Props> = ({ data }) => {
	console.log('raw xdata', data);
	const mappedData: ChargeTableData[] = (data ?? []).map((charge) => ({
		charge: charge.meter_name ? `${charge.meter_name}` : charge.name,
		quantity: charge.type === 'FIXED' ? '1' : 'pay as you go',
		price: <ChargeValueCell data={{ ...charge, currency: charge.currency } as any} />,
		invoice_cadence: charge.invoice_cadence,
	}));

	console.log('mappedData', mappedData);

	const [showAllRows, setShowAllRows] = useState(false);

	const columns: ColumnData<ChargeTableData>[] = [
		{
			fieldName: 'charge',
			title: 'Charge',
			fieldVariant: 'title',
		},
		{
			title: 'Billing Period',
			render: (data) => {
				return capitalize(data.invoice_cadence) || '--';
			},
		},
		{
			fieldName: 'quantity',
			title: 'Quantity',
		},
		{
			fieldName: 'price',
			title: 'Price',
		},
	];

	const displayedData = showAllRows ? mappedData : mappedData.slice(0, 5);

	return (
		<div>
			<div>
				<FormHeader title='Charges' variant='sub-header' />
			</div>
			<div className='rounded-xl border border-gray-300 space-y-6 mt-2 '>
				<motion.div
					initial={{ height: 'auto' }}
					// animate={{ height: showAllRows ? 'auto' : 200 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					style={{ overflow: 'hidden' }}>
					<FlexpriceTable columns={columns} data={displayedData} />
				</motion.div>
			</div>
			{mappedData.length > 5 && (
				<div className='text-center mt-4 w-full flex justify-center'>
					<span className='flex items-center gap-1 text-xs duration-300 transition-all' onClick={() => setShowAllRows((prev) => !prev)}>
						{showAllRows ? (
							<>
								<ChevronUpIcon className='w-4 h-4' />
							</>
						) : (
							<>
								<ChevronDownIcon className='w-4 h-4' />
							</>
						)}
					</span>
				</div>
			)}
		</div>
	);
};

export default ChargeTable;
