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


}

export default Task;