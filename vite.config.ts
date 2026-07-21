import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { spawn } from 'node:child_process'
import { createConnection } from 'node:net'

// Vite dev server nevie spustat PHP, takze kontaktny formular by lokalne
// nefungoval - /php/contactForm.php by sa vratil ako obycajny text (zdrojak).
// Popri dev serveri preto zdvihneme vstavany PHP server nad priecinkom public/
// a poziadavky na /php/* nan preposielame (server.proxy nizsie).
// Docroot je public/, takze contactForm.php najde `.env` cez ../../ v koreni repa,
// rovnako ako na hostingu (o uroven vyssie nad webrootom).
const PHP_PORT = 8890

// ci uz na porte nieco pocuva (napr. PHP server, ktory prezil tvrde ukoncenie
// predchadzajuceho dev servera) - vtedy ho len pouzijeme a nespustame novy
function portInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const sock = createConnection({ host: '127.0.0.1', port })
    sock.setTimeout(300)
    const done = (result: boolean) => {
      sock.destroy()
      resolve(result)
    }
    sock.once('connect', () => done(true))
    sock.once('error', () => done(false))
    sock.once('timeout', () => done(false))
  })
}

function phpDevServer(): PluginOption {
  return {
    name: 'php-dev-server',
    apply: 'serve',
    async configureServer(server) {
      const log = server.config.logger
      if (await portInUse(PHP_PORT)) {
        log.info(`  ➜  PHP:     uz bezi na http://127.0.0.1:${PHP_PORT} (proxy /php/*)`)
        return
      }

      const php = spawn('php', ['-S', `127.0.0.1:${PHP_PORT}`, '-t', 'public'], { stdio: 'ignore' })

      php.on('error', () => {
        log.warn(
          '\n[php] PHP sa nepodarilo spustit - kontaktny formular nebude lokalne fungovat.\n' +
            '      Nainstaluj PHP a daj ho do PATH, zvysok webu funguje aj bez neho.\n',
        )
      })
      php.on('spawn', () => log.info(`  ➜  PHP:     http://127.0.0.1:${PHP_PORT} (proxy /php/*)`))
      php.on('exit', (code) => {
        if (code) log.warn(`[php] PHP server skoncil s kodom ${code} - /php/* nebude fungovat.`)
      })

      const stop = () => {
        if (!php.killed) php.kill()
      }
      server.httpServer?.once('close', stop)
      process.once('exit', stop)
      process.once('SIGINT', stop)
      process.once('SIGTERM', stop)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), phpDevServer()],
  server: {
    proxy: {
      '/php': `http://127.0.0.1:${PHP_PORT}`,
    },
  },
})
