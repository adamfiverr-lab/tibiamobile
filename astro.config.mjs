// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://tibiamobile.com',

  integrations: [
      mdx(),
      sitemap({
          serialize(item) {
              const url = item.url.replace('https://tibiamobile.com', '');
              if (url === '/' || url === '') {
                  item.priority = 1.0;
                  item.changefreq = 'weekly';
              } else if (url.startsWith('/wiki')) {
                  item.priority = 0.8;
                  item.changefreq = 'monthly';
              } else if (url.startsWith('/blog')) {
                  item.priority = 0.7;
                  item.changefreq = 'monthly';
              } else if (url.startsWith('/tools')) {
                  item.priority = 0.6;
                  item.changefreq = 'monthly';
              } else if (url === '/guide' || url === '/guide/') {
                  item.priority = 0.8;
                  item.changefreq = 'monthly';
              } else if (url === '/play' || url === '/play/') {
                  item.priority = 0.7;
                  item.changefreq = 'monthly';
              } else {
                  item.priority = 0.5;
                  item.changefreq = 'monthly';
              }
              return item;
          },
      }),
	],

  adapter: cloudflare(),
});