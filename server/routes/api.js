const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
// const fs = require('fs');


router.get('/files/:filename/download', async (req, res) => {
    const filename = req.params.filename;
    // Connect GridFS and mongo
    const conn = mongoose.connection;
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });

    // Check if the file exists in GridFS
    const file = await gfs.find({ filename: filename }).toArray();

    if (file.length === 0) {
        return res.status(404).json({ message: 'File not found' });
    }

    res.setHeader('Content-Type', file[0].contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Pipe the file data to the response
    gfs.openDownloadStreamByName(filename).pipe(res);
});

  
  
module.exports = router;