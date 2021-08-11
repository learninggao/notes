/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.dev.js')
const path = require('path')
// const request = require('request')
const app = express()
const compiler = webpack(config)
// const https = require('https')

/* body parsers */
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const middleWare = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // historyApiFallback: true,
})
app.use(middleWare)

// hot module replacement
app.use(
  require('webpack-hot-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
)

// app.get('/wp-content', (req, res) => {
//   const imageUrl = decodeURIComponent(req.query.url)
//   const requestOptions = {
//     url: imageUrl,
//     method: 'GET',
//   }
//   /** Dealing with expired cert error from xidol image host */
//   const url = new URL(imageUrl)
//   if (url.protocol === 'https:') {
//     const agent = new https.Agent({
//       host: url.host,
//       port: 443,
//       path: '/',
//       rejectUnauthorized: false,
//     })

//     requestOptions.agent = agent
//   }

//   request(requestOptions).pipe(res)
// })


// app.use('/public/', express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})
// res.write(
//   // middleWare.fileSystem.readFileSync(path.join(config.output.path, 'index.html')),
//   // middleWare.fileSystem.readFileSync(path.join('./', 'index.html'))
//   fs.readFileSync('./src/index.html')
// )
// res.end()
// })

// Serve the files on port 3000.
app.listen(3002, () => {
  console.log('Example app listening on port 3002!\n')
})
