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

}

export default Task;