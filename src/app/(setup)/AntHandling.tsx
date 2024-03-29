import { App } from 'antd';
import type { ReactNode } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import AntMessageHandling from './AntMessageHandling';
import AntRegistry from './AntRegistry';
import AntStyleConfig from './AntStyleConfig';

export interface AntHandlingProps {
	children: ReactNode;
}

export default function AntHandling({
	children,
}: ReadonlyDeep<AntHandlingProps>): ReactNode {
	return (
		<AntRegistry>
			<AntStyleConfig>
				<App>
					<AntMessageHandling />
					{children}
				</App>
			</AntStyleConfig>
		</AntRegistry>
	);
}
