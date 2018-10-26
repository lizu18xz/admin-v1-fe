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

    //新增任务
    save(jobInfo){
        return _mm.request({
            type: 'post',
            url:'/manager/job/save',
            data:jobInfo
        })
    }


    getTaskExecutor(){
        return _mm.request({
            type: 'post',
            url:'/manager/jobGroup/list'
        })
    }

    //暂停任务
    pause(JobInfoParams){
        return _mm.request({
            type: 'post',
            url:'/manager/job/pause',
            data:JobInfoParams
        })
    }

    //唤醒任务
    resume(JobInfoParams){
        return _mm.request({
            type: 'post',
            url:'/manager/job/resume',
            data:JobInfoParams
        })
    }

    //任务详情
    detail(JobInfoParams){
        return _mm.request({
            type: 'post',
            url:'/manager/job/delete',
            data:JobInfoParams
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



}

export default Task;