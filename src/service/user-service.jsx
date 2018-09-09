import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();

class User{

    login(loginInfo){
        return _mm.request({
            type: 'post',
            url:'/manager/user/login',
            data:loginInfo
        })
    }


    //检查登录接口数据
    checkLoginInfo(loginInfo){
        let username  = $.trim( loginInfo.username),
            password  = $.trim( loginInfo.password)
        if(typeof username !== 'string' || username.length === 0){
            return {
                status:false,
                msg:   '用户名不能为空'
            }
        }

        if(typeof password !== 'string' || password.length === 0){
            return {
                status:false,
                msg:   '密码不能为空'
            }
        }

        return {
            status: true,
            msg: '验证通过'
        }
    }

    //退出登录,暂时不关联后台，前台退出就可以
    logout(){
        /*return _mm.request({
            type: 'post',
            url:'/manager/user/logout.do'
        })*/
    }


}


export default User;