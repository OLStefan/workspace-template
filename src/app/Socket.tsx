'use client';

import useMount from '@/hooks/useMount';
import { uniqueId } from 'lodash';
import { io } from 'socket.io-client';

export default function Socket() {
	useMount(() => {
		const socket = io(window.location.host);
		socket.on('hello', (message) => console.log(message));

		setInterval(() => socket.emit('howdy', `stranger ${uniqueId()}`), 500);

		return () => {
			socket.disconnect();
		};
	});

	return null;
}
