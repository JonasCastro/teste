const   express = require('express');
const routes =  express.Router();
const FilesController = require('./controllers/FilesController');
// const SpotController = require('./controllers/SpotController');
// const DashboardController = require('./controllers/DashboardController');
// const BookingController = require('./controllers/BookingController');
// const ApprovalController = require('./controllers/ApprovalController');
// const RejectionController = require('./controllers/RejectionController');

// const multer = require('multer');
// const UploadConfig = require('./config/upload');
// const upload = multer(UploadConfig);

// routes.get('/arquivos', (req,res) =>{
//   const spots = await Spot.find({user: user_id});
//   return res.json(spots);
// });
// routes.get('/spots',SpotController.index);
// routes.post('/spots',upload.single('thumbnail'),SpotController.store);
// routes.get('/dashboard',DashboardController.show);
// routes.post('/spots/:spots_id/bookings',BookingController.store);
// routes.post('/bookings/:booking_id/approvals',ApprovalController.store);
// routes.post('/bookings/:booking_id/rejections',RejectionController.store);

module.exports = routes;