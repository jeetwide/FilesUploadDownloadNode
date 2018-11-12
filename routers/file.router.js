module.exports = (app, router, upload) => {
    const fileWorker = require('../controllers/file.controller.js');
	
	var path = __basedir + '/views/';
	
	router.use((req,res,next) => {
		console.log("/" + req.method);
		next();
	});
	
	app.get('/', (req,res) => {
		//res.sendFile(path + "index.html");
		res.send("welcome to image upload api");
		
	});
	
	app.post('/api/files/upload', upload.single("uploadfile"), fileWorker.uploadFile);
	
	/*app.post('/api/files/upload', upload.single("uploadfile"),function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  
})*/
	app.get('/api/files/getall', fileWorker.listAllFiles);
	
	app.get('/api/files/:filename', fileWorker.downloadFile);

	app.use('/',router);
 
	app.use('*', (req,res) => {
		//res.sendFile(path + "404.html");
		res.send("Error");
	});
}