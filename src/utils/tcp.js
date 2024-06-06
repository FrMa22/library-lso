// utils/tcp.js

import net from 'net';

function connectToServer(host, port, userEmail) {
    const client = new net.Socket();

    client.connect(port, host, () => {
        console.log('Connected to server');
        client.write(userEmail);
    });

    client.on('data', data => {
        const notification = JSON.parse(data.toString());
        console.log('Notification received:', notification);
        client.emit('notification', notification);
    });

    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', err => {
        console.error('Error:', err);
    });

    return client;
}

export default connectToServer;
