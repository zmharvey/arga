/**
 * Receiver for geometry posted from inside Roblox.
 *
 * Studio scripts cannot write to disk, so the probe POSTs its measurements to
 * localhost via HttpService. This is the smallest thing that closes the loop
 * without needing a plugin install.
 */

import { createServer } from 'node:http';

/**
 * @param {object} opts { port, timeoutMs, onReport }
 * @returns {Promise<object>} the first valid report received
 */
export function awaitReport({ port = 34765, timeoutMs = 300000, onWaiting } = {}) {
  return new Promise((resolvePromise, reject) => {
    const server = createServer((req, res) => {
      if (req.method !== 'POST') {
        res.writeHead(405).end('POST only');
        return;
      }
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        // Guard against a runaway payload holding the process open.
        if (body.length > 8_000_000) req.destroy();
      });
      req.on('end', () => {
        try {
          const report = JSON.parse(body);
          res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"ok":true}');
          server.close();
          clearTimeout(timer);
          resolvePromise(report);
        } catch (err) {
          res.writeHead(400).end(String(err.message));
        }
      });
    });

    const timer = setTimeout(() => {
      server.close();
      reject(new Error(`No report received within ${timeoutMs / 1000}s. Is the calibrate script running in Studio?`));
    }, timeoutMs);

    server.listen(port, '127.0.0.1', () => {
      onWaiting?.(port);
    });
    server.on('error', reject);
  });
}
