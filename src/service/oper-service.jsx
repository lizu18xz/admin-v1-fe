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
}

export default Operation;