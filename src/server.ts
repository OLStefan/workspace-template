import type { Server } from 'http';
import { createServer } from 'http';
import next from 'next';
import { Server as SocketServer } from 'socket.io';
import type { ReadonlyDeep } from 'type-fest';
import { parse } from 'url';

const IS_DEV_MODE = process.env.NODE_ENV !== 'production';
const HOSTNAME = 'localhost';
const PORT = 3000;
// when using middleware `hostname` and `port` must be provided below
const NEXT_SERVER = next({ dev: IS_DEV_MODE, hostname: HOSTNAME, port: PORT });
const handle = NEXT_SERVER.getRequestHandler();

NEXT_SERVER.prepare()
	.then(() => {
		const server = createServer((req, res) => {
			// Be sure to pass `true` as the second argument to `url.parse`.
			// This tells it to parse the query portion of the URL.
			const parsedUrl = parse(req.url!, true);
			handle(req, res, parsedUrl).catch((err: unknown) => {
				console.error('Error occurred handling', req.url, err);
				res.statusCode = 500;
				res.end('internal server error');
			});
		});
		server.once('error', (err) => {
			console.error(err);
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			process.exit(1);
		});

		socketStuff(server);

		server.listen(PORT, () => {
			console.log(`> Ready on http://${HOSTNAME}:${PORT}`);
		});
	})
	.catch((error: unknown) => {
		console.error('Failes to start server', { error });
	});

function socketStuff(httpServer: ReadonlyDeep<Server>) {
	const io = new SocketServer(httpServer, {
		// Socket.IO options
	});

	io.on('connection', (socket) => {
		console.log(`connect ${socket.id}`);

		socket.emit('hello', 'world');

		socket.on('howdy', (message) => {
			console.log(message);
			socket.emit('hello', message);
		});

		socket.on('disconnect', (reason) => {
			console.log(`disconnect ${socket.id} due to ${reason}`);
		});
	});
}
