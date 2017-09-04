gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');  //临时上下文

// WebGL
if(gl){
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.enable(gl.DEPTH_TEST);  //开启深度测试，z-缓存
    gl.depthFunc(gl.LEQUAL); //近的物体遮挡远的物体
    gl.clear(gl.COLOR_BUFFER_BIT|GL>DEPTH_BUFFER_BIT)
}
