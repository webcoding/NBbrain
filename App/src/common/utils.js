import _ from 'lodash'
export default {
    ajax(method = 'get', url =  '', data = null, fn){
        let response;
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                try{
                    response = JSON.parse(xhr.response);
                    fn(response);
                }catch(err){
                    console.log('返回json数据有问题，请检查')
                }
            }
        }
    },
    store(key,value){
        if(_.isObject(key)){
            for(let k in key){
                localStorage.setItem(k,key[k]);
            }
        }else if(!value){
            return localStorage.getItem(key);
        }else{
            localStorage.setItem(key, value);
        }
    }
}
