import { useParams, useOutletContext } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardHeader, AddButton, Loader, NoDataCard, ShortPagination } from '@/components/atoms';
import { ApiDocsContent } from '@/components/molecules';
import TaxApi from '@/api/TaxApi';
import { TAXRATE_ENTITY_TYPE } from '@/models/Tax';
import usePagination from '@/hooks/usePagination';
import toast from 'react-hot-toast';
import TaxAssociationTable from '@/components/molecules/TaxAssociationTable/TaxAssociationTable';
import TaxAssociationDialog from '@/components/molecules/TaxAssociationDialog';
import { CreateTaxAssociationRequest } from '@/types/dto/tax';
import { useState } from 'react';

type ContextType = {
	isArchived: boolean;
};

const TaxAssociation = () => {
	const { id: customerId } = useParams();
	const { isArchived } = useOutletContext<ContextType>();
	const { limit, offset, page } = usePagination();
	const [dialogOpen, setDialogOpen] = useState(false);

	const fetchTaxAssociations = async () => {
		return await TaxApi.listTaxAssociations({
			entity_type: TAXRATE_ENTITY_TYPE.CUSTOMER,
			entity_id: customerId!,
			limit,
			offset,
		});
	};

	const {
		data: taxAssociationsData,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['fetchTaxAssociations', customerId, page],
		queryFn: fetchTaxAssociations,
		enabled: !!customerId,
	});

	const createTaxAssociationMutation = useMutation({
		mutationFn: (payload: CreateTaxAssociationRequest) => TaxApi.createTaxAssociation(payload),
		onSuccess: () => {
			toast.success('Tax association created successfully');
			setDialogOpen(false);
			refetch();
		},
		onError: (error: any) => {
			toast.error(error.error?.message || 'Failed to create tax association. Please try again.');
		},
	});

	const handleAddTaxAssociation = () => {
		setDialogOpen(true);
	};

	const handleSaveTaxAssociation = (data: CreateTaxAssociationRequest) => {
		createTaxAssociationMutation.mutate(data);
	};

	const handleCancelTaxAssociation = () => {
		setDialogOpen(false);
	};

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		toast.error('Error fetching tax associations');
	}

	if (!taxAssociationsData?.items?.length) {
		return (
			<div>
				<ApiDocsContent tags={['Tax Associations']} />
				<TaxAssociationDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					entityType={TAXRATE_ENTITY_TYPE.CUSTOMER}
					entityId={customerId!}
					onSave={handleSaveTaxAssociation}
					onCancel={handleCancelTaxAssociation}
				/>
				<NoDataCard
					title='Tax Associations'
					subtitle='No tax associations found for this customer'
					cta={!isArchived && <AddButton onClick={handleAddTaxAssociation} disabled={false} />}
				/>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<ApiDocsContent tags={['Tax Associations']} />
			<Card variant='notched'>
				<CardHeader title='Tax Associations' cta={!isArchived && <AddButton onClick={handleAddTaxAssociation} disabled={false} />} />
				<TaxAssociationTable data={taxAssociationsData.items} />
				<ShortPagination unit='Tax Associations' totalItems={taxAssociationsData.pagination.total ?? 0} />
			</Card>

			<TaxAssociationDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				entityType={TAXRATE_ENTITY_TYPE.CUSTOMER}
				entityId={customerId!}
				onSave={handleSaveTaxAssociation}
				onCancel={handleCancelTaxAssociation}
			/>
		</div>
	);
};

export default TaxAssociation;
