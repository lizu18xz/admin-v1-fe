import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();

class Actuator{

    getActuatorList(pageNum){
        return _mm.request({
            type: 'post',
            url:'/manager/jobGroup/list',
            data:{
                page:pageNum
            }
        })
    }


    //新增
    save(groupInfo){
        return _mm.request({
            type: 'post',
            url:'/manager/jobGroup/save',
            data:groupInfo
        })
    }


    detail(id){
        return _mm.request({
            type: 'post',
            url:'/manager/jobGroup/detail',
            data:{
                id:id
            }
        })
    }

    delete(id){
        return _mm.request({
            type: 'post',
            url:'/manager/jobGroup/delete',
            data:{
                id:id
            }
        })
    }

    server(name){
        return _mm.request({
            type: 'post',
            url:'/manager/jobGroup/server',
            data:{
                name:name
            }
        })
    }




}

export default Actuator;