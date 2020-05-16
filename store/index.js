import Vue from 'vue';
import Vuex from 'vuex';

// 导入status模块（全局应用状态的模块）
import status from './modules/status';
// 导入关注状态管理
import follow from './modules/follow';
// 微服务-评论赞对象管理
import comment from './modules/comment';
// 微服务-论坛的评论赞对象管理
import forum from './modules/forum';

Vue.use(Vuex); // 如果vuex在index.html中使用了cdn方式，这里需注释掉~ mod by Dio Zhu. on 2017.6.23

// env里去获取当前的环境是否需要开启严格模式
// 在发布环境开启严格模式会造成性能上不必要的损失
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: { // 导入模块
        status,
        follow,
        comment,
        forum
    },
    // 是否开启严格模式
    strict: debug
});
