const express = require('express');
const router = express.Router();
const File = require('../models/file');

// : for dynamic paramter
router.get('/:uuid', async (req, res) => {
    try{
        const file = await File.findOne({ uuid : req.params.uuid });
        if(!file){
            return res.render('download', {error : 'Link has been expired'});
        }
        return res.render('download', { 
            uuid : file.uuid,
            fileName : file.filename,
            fileSize : file.size,
            downloadLink : `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    }catch(err){
        // console.log("Anything wrong happen");
        return res.render('download', {error : 'Something went wrong'});
    }
});

module.exports = router;