'use client';

import { ConfigProvider, theme } from 'antd';
import type { CSSProperties, ReactNode } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import { THEME_CONFIG } from '../../theme';
import styles from './setup.module.css';

export interface AntStyleConfigProps {
	children: ReactNode;
}

export default function AntStyleConfig({
	children,
}: ReadonlyDeep<AntStyleConfigProps>): ReactNode {
	return (
		<ConfigProvider theme={THEME_CONFIG}>
			<AntStyleInjector>{children}</AntStyleInjector>
		</ConfigProvider>
	);
}

function AntStyleInjector({ children }: ReadonlyDeep<AntStyleConfigProps>) {
	const { token } = theme.useToken();
	const antVariables = {
		'--spacing-small': token.margin,
	} as CSSProperties;

	return (
		<div style={antVariables} className={styles.root}>
			{children}
		</div>
	);
}
