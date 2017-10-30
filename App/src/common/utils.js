import _ from 'lodash'
export default {
    ajax(method = 'get', url =  '', data = null){
        let response;
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                response = JSON.parse(xhr.response);
            }
        }
        return response;
    },
    store(key,value){
        if(_.isObject(key)){
            for(let k in key){
                localStorage.setItem(k,key[k]);
            }
        }else if(!value){
            localStorage.getItem(key);
        }else{
            localStorage.setItem(key, value);
        }
    }
}
