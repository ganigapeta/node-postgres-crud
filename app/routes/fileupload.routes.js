const multer = require('multer');


module.exports = function (app) {
    var fileupload = require('../controllers/fileupload.controller.js');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
    })
    var upload = multer({ storage: storage })
    // Define a route for handling image uploads
    app.post('/upload', upload.single('image'), fileupload.simpleFileUpload);
    app.get('/image/:Id', fileupload.getImageById);
}