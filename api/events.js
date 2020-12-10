const express = require('express');

function createRouter(db) {
  const router = express.Router();
  router.get('/event/', function (req, res, next) {
    db.query(
      'SELECT * FROM data',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });


  
  router.post('/userdetails', (req, res, next) => {


    db.query(
    'INSERT INTO userdetails (name,mobile,address) VALUES (?,?,?)',
    [req.body.name, req.body.mobile, req.body.address],
   (error) => {
     if (error) {
       console.error(error);
       res.status(500).json({status: 'error'});
     } else {
       res.status(200).json({status: 'ok'});
     }
   }
 ); 

});

 router.post('/orderdetails', (req, res, next) => {


    db.query(
    'INSERT INTO orderdetails (orderId,status) VALUES (?,?)',
    [req.body.orderid, req.body.status],
   (error) => {
     if (error) {
       console.error(error);
       res.status(500).json({status: 'error'});
     } else {
       res.status(200).json({status: 'ok'});
     }
   }
 ); 

});

router.get('/orderdetails', function (req, res, next) {



 
 db.query(
   'SELECT status FROM orderdetails WHERE orderid=? ',[req.query.orderid],
   (error, results) => {
     if (error) {
       console.log(error);
       res.status(500).json({status:'error'});
     } else {
       res.status(200).json(results);
     }
   }
 );

 
});


  return router;
}

module.exports = createRouter;