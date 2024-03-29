/* eslint-disable @typescript-eslint/no-magic-numbers */
'use client';

import useMount from '@/hooks/useMount';
import { uniqueId } from 'lodash';
import type { ReactNode } from 'react';
import { io } from 'socket.io-client';

export default function Socket(): ReactNode {
	useMount(() => {
		const socket = io(window.location.host);
		socket.on('hello', (message) => { console.log(message); });

		setInterval(() => socket.emit('howdy', `stranger ${uniqueId()}`), 500);

		return () => {
			socket.disconnect();
		};
	});

	return null;
}
