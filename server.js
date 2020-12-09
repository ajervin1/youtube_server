//  Imports
const ytdl = require('ytdl-core')
const fs = require('fs')
const { convertYoutubeVideo } = require('./youtubeservice')
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
// Mongoose




//  Middleware
// Server Root Folder
app.use(express.static('./'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(morgan('dev'))
app.use(cors())
app.use(session({
	secret: 'password'
}))
// Routes


// Convert Url and Write File To Disk
// First Convert Url
app.post('/convert', async (req, res) => {
	const { youtube_url, media_type } = req.body
	// Based On Media Type Change Extension
	const filename = await convertYoutubeVideo(youtube_url, media_type)
	setTimeout(() => {
		console.log('hopefull done')
		res.send(filename)
	}, 3000)
})

// Download File
// After Url is downloaded and is on the server show a download button
app.get('/download', (req, res) => {
	const { filename } = req.query
	// Download File
	console.log(filename)
	res.download(filename)
})





// Server Start
app.listen(4000, () => {
	console.log('server listening')
})
