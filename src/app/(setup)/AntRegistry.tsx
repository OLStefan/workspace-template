'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const AntRegistry = ({ children }: Props) => {
	const cache = createCache();
	useServerInsertedHTML(() => (
		<style
			id="antd"
			// eslint-disable-next-line @typescript-eslint/naming-convention
			dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
		/>
	));
	return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
