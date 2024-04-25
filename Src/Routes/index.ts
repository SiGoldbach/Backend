import express from 'express';
const router = express.Router();
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Path to SPA
const staticPathToSPA: string = path.join(__dirname, '../../../FrontendWebShop9/dist/');
//List of current paths to the frontend needs to be updated if frontend gets a new path 
router.use(express.static(staticPathToSPA));
const pathsToSPA =["store","cart","checkout","admin","bothForms"];
//Generating paths that all serve the same SPA 
pathsToSPA.forEach(path=>{
    router.get('/${path}',(req,res)=>{
        res.sendFile(staticPathToSPA);

    })
})

export default router;