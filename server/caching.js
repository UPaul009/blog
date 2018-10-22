import Cache from 'tmp-cache';
import * as Sentry from '@sentry/node';

export const cacheTimesInSeconds = {
  year: 31536000,
  month: 2628000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  default: 600, // 10 minutes
};

const cache = new Cache({
  max: process.env.NODE_ENV === 'prodiction' ? 100 : 0,
  maxAge: 1000 * 60 * 60, // 1 hour
});

const getCacheKey = req => `${req.url}`;

const renderAndCache = async ({ app, req, res, pagePath, queryParams }) => {
  const key = getCacheKey(req);

  res.setHeader(
    'Cache-Control',
    `max-age=${cacheTimesInSeconds.default}, must-revalidate`
  );

  // If we have a page in the cache, let's serve it
  if (cache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.setHeader('Content-Type', 'text/html');
    const page = cache.get(key);
    return res.end(page);
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // If something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      return res.end(html);
    }

    // Let's cache this page
    cache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.setHeader('Content-Type', 'text/html');
    return res.end(html);
  } catch (error) {
    Sentry.captureException(error);
    return app.renderError(error, req, res, pagePath, queryParams);
  }
};

export default renderAndCache;
