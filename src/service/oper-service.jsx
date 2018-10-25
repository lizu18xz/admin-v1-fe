import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();

class Operation{

    getOperationList(listParam){
        return _mm.request({
            type: 'post',
            url:'/manager/jobLog/list',
            data:listParam
        })
    }

    getLog(listParam){
        return _mm.request({
            type: 'post',
            url:'/manager/jobLog/loadLog',
            data:listParam
        })
    }

}

export default Operation;