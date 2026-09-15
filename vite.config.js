export default {
  base: './',
  server: {
    host: true,
    allowedHosts: true
  },
  preview: {
    host: true,
    port: 5190,
    allowedHosts: true,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow, noarchive'
    }
  }
};
