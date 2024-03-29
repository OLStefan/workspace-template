import '../scripts/antd.min.css';
import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { ReadonlyDeep } from 'type-fest';
import AntHandling from './(setup)/AntHandling';
import Socket from './Socket';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const metadata: Metadata = {
	title: 'PLACEHOLDER PLEASE CHANGE',
	icons: `./favicon.ico`,
};

const INTER = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: ReadonlyDeep<{
	children: ReactNode;
}>): ReactNode {
	return (
		<html lang="en">
			<head />
			<body className={INTER.className}>
				<Socket />
				<AntHandling>{children}</AntHandling>
			</body>
		</html>
	);
}
