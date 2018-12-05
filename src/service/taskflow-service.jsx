import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();

class TaskFlow{

    getTaskFlowList(pageNum){
        return _mm.request({
            type: 'post',
            url:'/manager/jobFlow/list',
            data:{
                page:pageNum
            }
        })
    }


    //新增
    save(flowInfo){
        return _mm.request({
            type: 'post',
            url:'/manager/jobFlow/save',
            data:flowInfo
        })
    }


    detail(id){
        return _mm.request({
            type: 'post',
            url:'/manager/jobFlow/detail',
            data:{
                id:id
            }
        })
    }

    delete(id){
        return _mm.request({
            type: 'post',
            url:'/manager/jobFlow/delete',
            data:{
                id:id
            }
        })
    }

}

export default TaskFlow;