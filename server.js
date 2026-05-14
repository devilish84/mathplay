import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app  = express()
const PORT = process.env.PORT ?? 3000
const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, 'dist')

app.use(express.static(dist))
app.get('*', (_, res) => res.sendFile(join(dist, 'index.html')))

app.listen(PORT, () => {
  console.log(`Mathplay running at http://localhost:${PORT}`)
})
