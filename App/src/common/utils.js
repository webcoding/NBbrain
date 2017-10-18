export default {
    ajax(method = 'get', url =  '', data = null){
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                let response = JSON.parse(xhr.response);
            }
        }
        return response;
    }
}
