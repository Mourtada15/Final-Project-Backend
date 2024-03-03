import multer from 'multer';
import { Request } from "express";
// import path from 'path';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, './uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// const upload = multer({ storage, limits: { fieldSize: 2 * 1024 * 1024 } });
// export default upload;

export default multer({ storage: storage });