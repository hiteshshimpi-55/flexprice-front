import { FC } from 'react';
import FlexpriceTable, { ColumnData, RedirectCell } from '../Table';
import { TaxAssociationResponse } from '@/types/dto/tax';
import { Chip, ActionButton } from '@/components/atoms';
import { formatDateShort } from '@/utils/common/helper_functions';
import TaxApi from '@/api/TaxApi';
import formatChips from '@/utils/common/format_chips';
import { RouteNames } from '@/core/routes/Routes';

interface Props {
	data: TaxAssociationResponse[];
	onEdit?: (taxAssociation: TaxAssociationResponse) => void;
	showDelete?: boolean;
}

const TaxAssociationTable: FC<Props> = ({ data, onEdit, showDelete = true }) => {
	const columns: ColumnData<TaxAssociationResponse>[] = [
		{
			title: 'Tax ID',
			render: (row) => (
				<RedirectCell redirectUrl={`${RouteNames.taxes}/${row.tax_rate_id}`}>{row.tax_rate?.name || row.tax_rate_id}</RedirectCell>
			),
		},
		{
			title: 'Currency',
			render: (row) => row.currency,
		},
		{
			title: 'Status',
			render: (row) => {
				const label = formatChips(row?.status);
				return <Chip variant={label === 'Active' ? 'success' : 'default'} label={label} />;
			},
		},
		{
			title: 'Created',
			render: (row) => formatDateShort(row.created_at),
		},
		{
			fieldVariant: 'interactive',
			render(row) {
				return (
					<ActionButton
						deleteMutationFn={async () => {
							return await TaxApi.deleteTaxAssociation(row?.id);
						}}
						id={row?.id}
						editPath={''}
						isEditDisabled={false}
						isArchiveDisabled={!showDelete}
						refetchQueryKey={'fetchTaxAssociations'}
						entityName={`Tax Association ${row?.id}`}
						onEdit={() => onEdit?.(row)}
					/>
				);
			},
		},
	];

	return (
		<div>
			<FlexpriceTable showEmptyRow={true} columns={columns} data={data} />
		</div>
	);
};

export default TaxAssociationTable;
