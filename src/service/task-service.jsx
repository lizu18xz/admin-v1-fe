import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();

class Task{

    getTaskList(listParam){
        return _mm.request({
            type: 'post',
            url:'/manager/job/list',
            data:listParam
        })
    }

    getTaskExecutor(){
        return _mm.request({
            type: 'post',
            url:'/manager/jobGroup/list'
        })
    }

    //任务详情
    detail(jobId){
        return _mm.request({
            type: 'post',
            url:'/manager/job/detail',
            data:{
                jobId:jobId
            }
        })
    }

    //任务详情
    runTask(jobId){
        return _mm.request({
            type: 'post',
            url:'/manager/job/trigger',
            data:{
                jobId:jobId
            }
        })
    }


    //任务流
    //新增任务

    save(jobInfo){
        return _mm.request({
            type: 'post',
            url:'/manager/job/save',
            data:jobInfo
        })
    }

    //修改任务
    editor(jobInfo){
        return _mm.request({
            type: 'post',
            url:'/manager/job/editor',
            data:jobInfo
        })
    }


    //删除任务
    deleteTask(params){
        return _mm.request({
            type: 'post',
            url:'/manager/job/delete',
            data:params
        })
    }


    //查询任务流下面的任务列表
    flowJobList(listParam){
        return _mm.request({
            type: 'post',
            url:'/manager/job/flowJobList',
            data:listParam
        })
    }

}

export default Task;