import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();

class Actuator{

    getActuatorList(params){
        return _mm.request({
            type: 'post',
            url:'/manager/user/login',
            data:params
        })
    }

}

export default Actuator;