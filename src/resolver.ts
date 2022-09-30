import axios from 'axios'
import * as cheerio from 'cheerio';

const URL_REGEX_PATTERN = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
const MENTIONS_REGEX_PATTERN = /\B@[a-z0-9_-]+/gi
const EMOTICONS_REGEX_PATTERN = /\([A-Za-z]*\)/g


export const records = async ({ message }: { message: String }) => {
  const result = message.match(URL_REGEX_PATTERN) || []
  let url = '', documentTitle = '';

  if(result[0]) {
    url = result[0]
    const res = await axios.get(url)
    const html = res.data
    const jQuery = cheerio.load(html);
    documentTitle = jQuery('title').text().replace(/\r?\n/g, '');
  }

  return {
    mentions: message.match(MENTIONS_REGEX_PATTERN),
    emoticons: message.match(EMOTICONS_REGEX_PATTERN),
    links: [
      {
        url,
        title: documentTitle
      }
    ]
  }
}
