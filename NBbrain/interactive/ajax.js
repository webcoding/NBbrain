;(function($){
    var currentQuestion = 0, name, temp = {}, condition;
    var xhr = new XMLHttpRequest();
    $('#addItem').click(function(){
        var original = $('.itemOriginal');
        var parent = original.parent();
        var clone = original.clone().removeClass('itemOriginal').val('');
        parent.append(clone);
    });
    html = `<div class="nb_lay_wrap">
    <div class="nb_lay_content">
        <div class="nb_question_content">
            <dl>
                <dt>请填写题目</dt>
                <dd><input name="question.question_name" type="text"/></dd>
            </dl>
            <dl>
                <dt>分值</dt>
                <dd>
                    <input name="question.score" checked="true" type="radio" value="1" id="question_score"/>
                    <label for="question_score">1分</label>
                    <input name="question.score" type="radio" value="2" id="question_score_1"/>
                    <label for="question_score_1">2分</label>
                    <input name="question.score" type="radio" value="3" id="question_score_2"/>
                    <label for="question_score_2">3分</label>
                </dd>
            </dl>
            <dl>
                <dt>答题所需时间</dt>
                <dd>
                    <input name="question.time_limit" checked="true" type="radio" value="10" id="question_time_limit"/>
                    <label for="question_time_limit">10秒</label>
                    <input name="question.time_limit" type="radio" value="15" id="question_time_limit_1"/>
                    <label for="question_time_limit_1">15秒</label>
                    <input name="question.time_limit" type="radio" value="20" id="question_time_limit_2"/>
                    <label for="question_time_limit_2">20秒</label>
                </dd>
            </dl>
            <dl>
                <dt>该题目所需素材</dt>
                <dd>
                    <input name="question.material_url" type="file"/>
                </dd>
            </dl>
            <dl>
                <dt>请填写选项内容</dt>
                <dd>
                    <input class="itemOriginal" name="question.items" type="text"/>
                </dd>
            </dl>
        </div>
    </div>
    <div class="nb_lay_bottom">
        <button id="continueAddQuestion">继续添加题目</button>
    </div>
</div>`
    var state = false;
    $('#addQuestion').click(function(){
        if(!state){
            $('body').append(html);
            state = true;
        }
        var dataForm = handleData('.nb_question_content input');
        // dataForm.append('qbank_id',localStorage.getItem('qbank_id'));
        // dataForm.append('question_id',localStorage.getItem('question_ids'));
        xhr.open('post', '/checkQbank');
        xhr.onload = function(each){
            xhr.status === 200 && console.log(xhr.responseText);
        }
        xhr.send(dataForm);
        // e.preventDefault();
    });

    // $('#saveEdit').click(function(){

    // });
    // let testURL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2809d5f8b7a15179&secret=0f917d181fcbee557fa719c25e69718c';
    // $.ajax({
    //     url: testURL,
    //     type: 'GET',
    //     dataTyp: 'jsonp',
    //     success: function(data){
    //         console.log(data);
    //     }
    // })

    $('#completeEdit').click(function(){
        var dataForm = handleData('.nb_content input');
        // var qbank_id = localStorage.getItem('qbank_id');
        // dataForm.append('qbank_id', qbank_id);
        xhr.open('post', '/checkQbank');
        xhr.onload = function(each){
            if(xhr.status === 200){
                var res = JSON.parse(xhr.responseText);
                // localStorage.setItem('qbank_id', res.qbank_id);
                // localStorage.setItem('question_ids', _.pluck(res.questions,'question_id'));
            }
        }
        xhr.send(dataForm);
    });

    function handleData(elem){
        var dataForm = new FormData();
        $(elem).each(function(i,v){
            condition = v.name.includes('material');
            if(v.name.includes('question.')){
                name = v.name.slice(9);
                if(condition){
                    dataForm.append(name, v.files.length ? v.files[0] : null);
                }else if(!!v.checked){
                     dataForm.append(name, v.value);
                }else if(v.type!='radio'){
                     dataForm.append(name,  v.value);
                }
            }else{
                if(condition){
                    dataForm.append(v.name, v.files.length ? v.files[0] : null);
                    // data[v.name] = v.files.length ? v.files[0] : null;
                }else{
                    dataForm.append(v.name, v.value);
                    // data[v.name] = v.value;
                }
            }
        });
        return dataForm;
    }
})(Zepto)
