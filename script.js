const connectDB = require('./config/db');
const File = require('./models/file');
const fs = require('fs');

connectDB();

async function deleteData(){
    const pastDate = new Date(Date.now() - 24*60*60*1000);
    // $lt is less than , this is how we write query in mongoose
    const files = await File.find({ createdAt : { $lt :  pastDate} });
    
    if(files.length){
        for(const file of files){
            try{
                fs.unlinkSync(file.path); // delete file from upload folder
                await file.remove(); // delete from database
                console.log(`successfully deleted ${file.filename}`);
            }catch(err){
                console.log(`Error while deleting file ${err}`);
            }   
        }
        console.log('Deletion done');
    }
}
deleteData().then(process.exit);