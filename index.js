var express = require('express')
var multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var app = express()

var port = process.env.PORT || 5000

app.get('/', function (req, res) {
  res.end('<p>Submit a file to view its filesize.</p><form action="/" method="post" enctype="multipart/form-data"> <input type="file" name="file"> <input type="submit"></form>')
})

app.post('/', upload.single('file'), function (req, res) {
  if (req.file && req.file.size) {
    res.json({size: req.file.size})
  } else {
    res.json({error: 'Please submit a file'})
  }
})

app.listen(port, function () {
  console.log('File Metadata Microservice started on port ' + port + '!')
})
