import fs from 'fs'

const inputFile = './urls.txt'
const outputFile = './results.csv'

// читаем список адресов
const urls = fs.readFileSync(inputFile, 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean)

console.log(`Всего URL: ${urls.length}`)

async function checkRedirect(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' })

    const isRedirect = res.status >= 300 && res.status < 400
    const location = isRedirect ? res.headers.get('location') : ''

    return {
      url,
      status: res.status,
      redirectTo: location
    }
  } catch (err) {
    return {
      url,
      status: 'ERROR',
      redirectTo: err.message
    }
  }
}

async function run() {
  const results = []
  let i = 0

  for (const url of urls) {
    i++
    process.stdout.write(`Проверяю ${i}/${urls.length}\r`)
    const result = await checkRedirect(url)
    results.push(result)
  }

  const header = 'url,status,redirect_to\n'
  const rows = results
    .map(r => `"${r.url}","${r.status}","${r.redirectTo || ''}"`)
    .join('\n')

  fs.writeFileSync(outputFile, header + rows)

  console.log(`\nГотово! Файл сохранен: ${outputFile}`)
}

run()