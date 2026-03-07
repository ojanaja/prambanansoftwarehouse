import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'id'];
import {routing} from './i18n/navigation';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  // Validate locale
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  let messages;
  if (locale === 'en') {
    messages = (await import('../messages/en.json')).default;
  } else {
    messages = (await import('../messages/id.json')).default;
  }

  return {
    locale,
    messages
  };
});
