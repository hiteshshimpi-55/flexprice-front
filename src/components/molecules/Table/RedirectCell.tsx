import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface Props {
	redirectUrl: string;
	children: ReactNode;
	allowRedirect?: boolean;
}

const RedirectCell: FC<Props> = ({ redirectUrl, children, allowRedirect = true }) => {
	if (!allowRedirect) {
		return <div>{children}</div>;
	}

	return (
		<Link
			to={redirectUrl}
			aria-hidden='true'
			className='flex items-center gap-2 group underline decoration-dashed decoration-[1px] decoration-gray-500/50 underline-offset-4'>
			{children}
			<ExternalLink className='w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity duration-200' />
		</Link>
	);
};

export default RedirectCell;
