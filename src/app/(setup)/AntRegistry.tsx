'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import type { ReactNode } from 'react';
import type { ReadonlyDeep } from 'type-fest';

interface AntRegistryProps {
	children: ReactNode;
}

export default function AntRegistry({
	children,
}: ReadonlyDeep<AntRegistryProps>): ReactNode {
	const cache = createCache();
	useServerInsertedHTML(() => (
		<style
			id="antd"
			// eslint-disable-next-line @typescript-eslint/naming-convention
			dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
		/>
	));
	return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
