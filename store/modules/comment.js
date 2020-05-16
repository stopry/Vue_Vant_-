// 导入mutations的命名空间
import * as types from '../types';
import Vue from 'vue';

const state = {
    subjects: {},   // 主题的评论赞对象
    comments: {}    // 回复的评论赞对象
};

const getters = {
    subjects: state => state.subjects,
    comments: state => state.comments0.a21,fddfalet(
};

const mutations = {
    [types.GET_COMMENT] (state, id = 0) {
        return state.comments[id] ? state.comments[id] : null;
    },
    [types.SET_COMMENT] (state, obj) {
        if (!obj || !obj.Id) return;

        let cmt = {
            Id: parseInt(obj.Id) || parseInt(obj.SubjectId) || 0,                  // SubjectId
            UserId: parseInt(obj.UserId) || 0,
            CommentId: parseInt(obj.CommentId) || 0,    // 评论赞的ID
            CommentNum: parseInt(obj.CommentNum) || 0,
            CommentFlag: obj.CommentFlag,
            LikeNum: parseInt(obj.LikeNum) || 0,
            LikeFlag: obj.LikeFlag
        };

        if (!obj.CommentId) { // 如果不存在CommentId则为主题的评论赞对象
            Vue.set(state.subjects, cmt.Id, cmt); // 需遵守vue响应规则，不要直接创建新属性，而是通过set
        } else { // 主题评论的评论赞对象
            Vue.set(state.comments, cmt.CommentId, cmt); // 需遵守vue响应规则，不要直接创建新属性，而是通过set
        }
    },
    // 评论数+1
    [types.ADD_COMMENT_NUM] (state, cmt) {
        if (!cmt || !cmt.Id) return;
        if (!cmt.CommentId && state.subjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.subjects[cmt.Id].CommentNum += 1;
        } else if (state.comments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.comments[cmt.CommentId].CommentNum += 1;
        }
    },
    // 评论数-1
    [types.DEL_COMMENT_NUM] (state, cmt) {
        if (!cmt || !cmt.Id) return;
        // state.comments[id].CommentNum = state.comments[id].CommentNum > 0 ? state.comments[id].CommentNum - 1 : 0;
        if (!cmt.CommentId && state.subjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.subjects[cmt.Id].CommentNum = state.subjects[cmt.Id].CommentNum > 0 ? state.subjects[cmt.Id].CommentNum - 1 : 0;
        } else if (state.comments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.comments[cmt.CommentId].CommentNum = state.comments[cmt.CommentId].CommentNum > 0 ? state.comments[cmt.CommentId].CommentNum - 1 : 0;
        }
    },
    // 点赞+1
    [types.ADD_PRAISE] (state, cmt) {
        if (!cmt || !cmt.Id) return;
        // state.comments[id].LikeNum += 1;
        // state.comments[id].LikeFlag = true;
        if (!cmt.CommentId && state.subjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.subjects[cmt.Id].LikeNum += 1;
            state.subjects[cmt.Id].LikeFlag = true;
        } else if (state.comments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.comments[cmt.CommentId].LikeNum += 1;
            state.comments[cmt.CommentId].LikeFlag = true;
        }
    },
    // 点赞-1
    [types.DEL_PRAISE] (state, cmt) {
        if (!cmt || !cmt.Id) return;
        // state.comments[id].LikeNum = state.comments[id].LikeNum > 0 ? state.comments[id].LikeNum - 1 : 0;
        // state.comments[id].LikeFlag = false;
        if (!cmt.CommentId && state.subjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.subjects[cmt.Id].LikeNum = state.subjects[cmt.Id].LikeNum > 0 ? state.subjects[cmt.Id].LikeNum - 1 : 0;
            state.subjects[cmt.Id].LikeFlag = false;
        } else if (state.comments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.comments[cmt.CommentId].LikeNum = state.comments[cmt.CommentId].LikeNum > 0 ? state.comments[cmt.CommentId].LikeNum - 1 : 0;
            state.comments[cmt.CommentId].LikeFlag = false;
        }
    }
};

const actions = {
    addComment ({commit}, comment) {
        console.log('==========> addComment: ', comment);
    }
};

export default {
// 导出整个demo模块
    state,
    getters,
    actions,
    mutations
};
