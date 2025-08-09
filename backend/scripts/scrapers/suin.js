// scripts/scrapers/suin.js
import { chromium } from 'playwright'
import * as cheerio from 'cheerio'

export async function scrapeSUIN(listUrl) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(listUrl, { waitUntil: 'networkidle' })
  const html = await page.content()
  const $ = cheerio.load(html)

  const items = []
  $('.resultado').each((_, el) => {
    const titulo = $(el).find('.titulo').text().trim()
    const sourceUrl = new URL($(el).find('a').attr('href'), listUrl).toString()
    // parse tipo, numero, anio, entidad, fecha, sumario...
    items.push({ titulo, sourceUrl })
  })

  await browser.close()
  return items
}
