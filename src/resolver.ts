import axios from 'axios'
import * as cheerio from 'cheerio';

const URL_REGEX_PATTERN = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
const MENTIONS_REGEX_PATTERN = /\B@[a-z0-9_-]+/gi
const EMOTICONS_REGEX_PATTERN = /\([A-Za-z0-9]*\)/gi


export const records = async ({ message }: { message: string }) => {
  let links = null;
  const URLsArray = message.match(URL_REGEX_PATTERN)
  
  if(URLsArray) {
    links = await Promise.all(URLsArray.map(async (url: string) => {
      const res = await axios.get(url)
      const html = res.data
      const jQuery = cheerio.load(html);
      const pageTitle = jQuery('title').text().replace(/\r?\n/g, '');

      return {
        url,
        title: pageTitle
      }
    }))
  }

  
  // Remove @ symbol
  const mentions = message.match(MENTIONS_REGEX_PATTERN)?.map(mention => mention.slice(1))

  // remove opening & closing parenthesis
  const emoticons = message.match(EMOTICONS_REGEX_PATTERN)?.map(mention => mention.slice(1, mention.length-1))

  return {
    mentions,
    emoticons,
    links
  }
}
