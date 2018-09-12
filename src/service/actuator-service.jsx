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

}

export default Actuator;