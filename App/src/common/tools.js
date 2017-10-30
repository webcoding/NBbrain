import fs from 'fs';
import path from 'path';

let _path = path.resolve('../../icon');
export async function names_ICON(params) {
    await fs.readdir(_path, function(err, files){
        let temp_path;
        let result = [];
        console.log(err);
        if(!err){
            files.forEach(function(file){
                if(file.includes('.svg')){
                    result.push(file.replace('.svg',''));
                }
                // temp_path = path.normalize(_path + '/' + file);
                // fs.stat(temp_path, function(err, stat){
                //     if(stat.isFile()){
                //         console.log(stat);
                //     }
                // })
            })
        }
    });
    return result;
}
