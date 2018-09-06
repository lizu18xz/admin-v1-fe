


class MUtil{
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type       : param.type      ||  'get',
                url        : param.url        || '',
                dataType  : param.dataType   || 'json',
                data       : param.data       || null,
                success    :res=> {
                    if(0 === res.status){
                        //数据请求成功
                        typeof resolve === 'function' && resolve(res.data,res.msg)
                    }else if(10 === res.status){
                        //没有登录，强制登录
                        this.doLogin();
                    }else {
                        typeof reject === 'function' && reject(res.msg || res.data)
                    }
                },
                error   :err=>{
                    typeof reject === 'function' && reject(err.statusText)
                }
            });
        });
    }

    //登录跳转
    doLogin(){
        window.location.href='/login?redirect='+ encodeURIComponent(window.location.pathname);
    }

    //获取url参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    //错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~')
    }

    successTips(errMsg){
        alert(errMsg || '操作成功~')
    }


}

export default MUtil;