import type { ReactNode } from 'react';
import './globals.css';
import styles from './page.module.css';

export default function Page(): ReactNode {
	return (
		<div className={styles.root}>
			<span className="text-3xl font-bold underline">Hello World</span>
		</div>
	);
}
