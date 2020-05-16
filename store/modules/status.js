/**
 * Created by diozhu on 2017/3/16.
 */
import * as types from '../types';
import * as api from '../../js/core/api';

const state = {
    userInfo: {          // 登陆用户信息
        id: '',
        feedId: '',
        avatarId: '',
        title: '',
        subtitle: ''
    },
    signinStatus: false, // 登陆状态
    loading: 0,
    position: Object.create({}) // 滚动元素的位置信息
};

const getters = {
    userInfo: state => state.userInfo,
    position: state => state.position,
    loading: state => state.loading > 0
};

const mutations = {
    [types.SIGNIN] (state, user = null) {
        state.userInfo = user || {id: '', feedId: '', avatarId: '', title: '', subtitle: ''};
    },
    [types.SIGNIN_STATUS] (state, status = NaN) {
        // 这里对status传值做了审查，如没有传，则对要改变的布尔值进行取反操作
        state.signinStatus = isNaN(status) ? !state.signinStatus : status;
    },
    [types.SET_POSITION] (state, {key = '-1', val = {id: '', x: 0, y: 0}} = {}) {
        state.position[key] = val;
    },
    [types.GET_POSITION] (state, key = '') {
        if (!key || !state.position.hasOwnProperty(key)) return null;
        return state.position[key];
    },
    [types.DEL_POSITION] (state, key = '') {
        if (!key || !state.position.hasOwnProperty(key)) return null;
        delete state.position[key];
    },
    [types.OPEN_LOADING] (state) {
        state.loading = state.loading + 1;
        console.log('[STORE]OPEN_LOADING...', state.loading);
    },
    [types.CLOSE_LOADING] (state) {
        state.loading = state.loading > 0 ? state.loading - 1 : 0;
        console.log('[STORE]CLOSE_LOADING...', state.loading);
    }
};

const actions = {
    signIn ({commit}) {
        console.log('[store] signIn: ');
        // if () {
        commit(types.SIGNIN_STATUS);
        return api.signin().then((res) => {
            console.log('[store] signIn: ', res);
            commit(types.SIGNIN, {
                id: parseInt(res.userId),
                feedId: res.feedId,
                avatarId: res.avatarId,
                title: res.title,
                subtitle: res.subtitle
            });
            commit(types.SIGNIN_STATUS);
            return Promise.resolve();
        }).catch(e => {
            return Promise.reject(e);
        });
        // }
    },
    [types.CLOSE_LOADING] ({commit}) {
        // if (state.loading > 0) {
        setTimeout(() => {
            commit(types.CLOSE_LOADING);
        }, 400);
        // }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
