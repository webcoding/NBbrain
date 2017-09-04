// FileReader
// Type Arrays如何使用，8 16 32代表什么？在图片处理中
let canvas = document.createElement('canvas');
let choose = document.getElementById('testCanvas');
let start = document.getElementById('start');
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;
let gl = canvas.getContext('webgl');
console.log(gl);
// ctx = canvas.getContext('2d');

start.onclick = function(){
    let files = choose.files, base64, img, imgData;
    // 图片与canvas
    if(files && files.length > 0 && files[0].name.includes('.JPG')){
        base64 = URL.createObjectURL(files[0]);
        img = new Image();
        img.src = base64;
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
            imgData = ctx.getImageData(0,0, 400, 400).data.buffer;

        }
    // ctx.drawImage(img, x, y, w, h)  缩放
    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)  切片, 图像合成
        // ctx.beginPath();
        // ctx.moveTo(30,96);
        // ctx.lineTo(70,66);
        // ctx.lineTo(103,76);
        // ctx.lineTo(170,15);
        // ctx.stroke();
        // document.body.appendChild(img)
    }



}


// let
// let buf = new ArrayBuffer(imgData.data.length);
// let buf8 = new Uint8ClampedArray(buf);
// let data = new Uint32Array(buf);

// // let dataset =

// for(let y = 0; y<400; ++y){
//     for(let x = 0; x<400; ++x){
//         let value = dataset[y][x];
//         data[y* 400 + x] = (255 << 24) | (value/2 << 16) | (value << 8) | 255;
//     }
// }
// imgData.data.set(buf8);
// ctx.putImage(imgData, 0, 0);
