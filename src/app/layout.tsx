import '../scripts/antd.min.css';
import './globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
}: {
	children: React.ReactNode;
}) {
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
