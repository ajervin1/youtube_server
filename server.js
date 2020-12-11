//  Imports
const ytdl = require('ytdl-core')
const fs = require('fs')
const { convertAudio, convertVideo } = require('./youtubeservice')
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
	if (media_type == 'audio') {
		const filename = await convertAudio(youtube_url)
		res.send({ filename })
	} else {
		const filename = await convertVideo(youtube_url)
		res.send({ filename })
	}
})

// Download File
// After Url is downloaded and is on the server show a download button
app.get('/download', (req, res) => {
	const { filename } = req.query
	// Download File
	console.log(filename)
	res.download(filename)
})

app.get('/test', (req, res) => {
	res.send('hello world')
})



// Server Start
const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log('server listening')
})
