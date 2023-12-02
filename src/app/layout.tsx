import '../scripts/antd.min.css';
import './globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AntHandling from './(setup)/AntHandling';
import Socket from './Socket';

export const metadata: Metadata = {
	title: 'PLACEHOLDER PLEASE CHANGE',
	icons: `./favicon.ico`,
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body className={inter.className}>
				<Socket />
				<AntHandling>{children}</AntHandling>
			</body>
		</html>
	);
}
