

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: process.env.REACT_APP_API_CLAIMS,
      pathRewrite: {
        "^/api": "",
      },
    })
  );


  // Proxy configuration for the second endpoint
//   app.use(
//     '/api/second',
//     createProxyMiddleware({
//         target: process.env.REACT_APP_API_CLAIMS,
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api/second': '',
//       },
//     })
//   );
};
