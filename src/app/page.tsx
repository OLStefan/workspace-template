import type { ReactNode } from 'react';
import styles from './page.module.css';

export default function Page(): ReactNode {
	return (
		<div className={styles.root}>
			<span>Hello World</span>
		</div>
	);
}
