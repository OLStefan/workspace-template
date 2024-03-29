import { Server, createServer } from 'http';
import next from 'next';
import { Server as SocketServer } from 'socket.io';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
	.prepare()
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
			process.exit(1);
		});

		socketStuff(server);

		server.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
	})
	.catch((error: unknown) => {
		console.error('Failes to start server', { error });
	});

function socketStuff(httpServer: Server) {
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
