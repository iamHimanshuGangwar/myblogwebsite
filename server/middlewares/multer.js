import multer, { diskStorage } from "multer";
import path from'path'
// const upload=multer({
//     storage:diskStorage({})
// })
// export default upload;
const storage=diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join("uploads"));
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
       const ext=path.extname(file.originalname);
       cb(null,file.fieldname+"-"+uniqueSuffix+ext)
    }
})
const upload=multer({storage,limits:{fileSize:5*1024*1024},
fileFilter:function(req,file,cb){
    if(file.mimetype.startsWith('image/')){
        cb(null,true);
    } else {
        cb(new Error('Only image files allowed'), false);
    }
}});
export default upload;