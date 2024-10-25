const {createProxyMiddleware} = require('http-proxy-middleware')


// createProxyMiddleware 적용이 안되네.... 
module.exports = (app) => {
	console.log("createProxyMiddleware");
	
	app.use(
		"/api", 
		createProxyMiddleware({
			target: 'https://localhost:8080', 
			changeOrigin: true
		})
	);
};