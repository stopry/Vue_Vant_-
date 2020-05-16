// 导入mutations的命名空间
import * as types from '../types';
import Vue from 'vue';

const state = {
    follows: {}
};

const getters = {
    follows: state => state.follows
};

const mutations = {
    [types.GET_FOLLOW] (state, uid = 0) {
        return state.follows[uid] ? state.follows[uid] : NaN;
    },
    [types.SET_FOLLOW] (state, follow) {
        Vue.set(state.follows, follow.uid, follow.status); // 需遵守vue响应规则，不要直接创建新属性，而是通过set
    }
};

const actions = {
    followAdd ({commit}, uid) {
        // console.log('==========> add: ', uid);
        setTimeout(() => {
            commit(types.SET_FOLLOW, {uid: uid, status: 1});
        }, 100);
    },
    followDel ({commit}, uid) {
        // console.log('==========> del: ', uid);
        setTimeout(() => {
            commit(types.SET_FOLLOW, {uid: uid, status: 0});
        }, 100);
    }
};

export default {
// 导出整个demo模块
    state,
    getters,
    actions,
    mutations
};
