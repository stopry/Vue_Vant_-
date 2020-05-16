// 导入mutations的命名空间
import * as types from '../types';
import Vue from 'vue';

const state = {
    forumSubjects: {},   // 主题的评论赞对象
    forumComments: {}    // 回复的评论赞对象
};

const getters = {
    forumSubjects: state => state.forumSubjects,
    forumComments: state => state.forumComments
};

const mutations = {
    [types.GET_FORUM_COMMENT] (state, id = 0) {
        return state.forumComments[id] ? state.forumComments[id] : null;
    },
    [types.SET_FORUM_COMMENT] (state, obj) {
        if (!obj || !obj.Id) return;

        let cmt = {
            Id: parseInt(obj.Id) || 0,                  // SubjectId
            UserId: parseInt(obj.UserId) || 0,
            CommentId: parseInt(obj.CommentId) || 0,    // 评论赞的ID
            CommentNum: parseInt(obj.CommentNum) || 0,
            CommentFlag: obj.CommentFlag,
            LikeNum: parseInt(obj.LikeNum) || 0,
            LikeFlag: obj.LikeFlag
        };

        if (!obj.CommentId) { // 如果不存在CommentId则为主题的评论赞对象
            Vue.set(state.forumSubjects, cmt.Id, cmt); // 需遵守vue响应规则，不要直接创建新属性，而是通过set
        } else { // 主题评论的评论赞对象
            Vue.set(state.forumComments, cmt.CommentId, cmt); // 需遵守vue响应规则，不要直接创建新属性，而是通过set
        }
    },
    // 评论数+1
    [types.ADD_FORUM_COMMENT_NUM] (state, cmt) {
        if (!cmt || !cmt.Id) return;
        if (!cmt.CommentId && state.forumSubjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.forumSubjects[cmt.Id].CommentNum += 1;
        } else if (state.forumComments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.forumComments[cmt.CommentId].CommentNum += 1;
        }
    },
    // 评论数-1
    [types.DEL_FORUM_COMMENT_NUM] (state, cmt) {
        console.log('***************************************', cmt);
        if (!cmt || !cmt.Id) return;
        // state.forumComments[id].CommentNum = state.forumComments[id].CommentNum > 0 ? state.forumComments[id].CommentNum - 1 : 0;
        if (!cmt.CommentId && state.forumSubjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.forumSubjects[cmt.Id].CommentNum = state.forumSubjects[cmt.Id].CommentNum > 0 ? state.forumSubjects[cmt.Id].CommentNum - 1 : 0;
        } else if (state.forumComments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.forumComments[cmt.CommentId].CommentNum = state.forumComments[cmt.CommentId].CommentNum > 0 ? state.forumComments[cmt.CommentId].CommentNum - 1 : 0;
        }
    },
    // 点赞+1
    [types.ADD_FORUM_PRAISE] (state, cmt) {
        if (!cmt || !cmt.Id) return;
        // state.forumComments[id].LikeNum += 1;
        // state.forumComments[id].LikeFlag = true;
        if (!cmt.CommentId && state.forumSubjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.forumSubjects[cmt.Id].LikeNum += 1;
            state.forumSubjects[cmt.Id].LikeFlag = true;
        } else if (state.forumComments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.forumComments[cmt.CommentId].LikeNum += 1;
            state.forumComments[cmt.CommentId].LikeFlag = true;
        }
    },
    // 点赞-1
    [types.DEL_FORUM_PRAISE] (state, cmt) {
        if (!cmt || !cmt.Id) return;
        // state.forumComments[id].LikeNum = state.forumComments[id].LikeNum > 0 ? state.forumComments[id].LikeNum - 1 : 0;
        // state.forumComments[id].LikeFlag = false;
        if (!cmt.CommentId && state.forumSubjects.hasOwnProperty(cmt.Id)) { // 主题的评论赞
            state.forumSubjects[cmt.Id].LikeNum = state.forumSubjects[cmt.Id].LikeNum > 0 ? state.forumSubjects[cmt.Id].LikeNum - 1 : 0;
            state.forumSubjects[cmt.Id].LikeFlag = false;
        } else if (state.forumComments.hasOwnProperty(cmt.CommentId)) { // 评论的评论赞
            state.forumComments[cmt.CommentId].LikeNum = state.forumComments[cmt.CommentId].LikeNum > 0 ? state.forumComments[cmt.CommentId].LikeNum - 1 : 0;
            state.forumComments[cmt.CommentId].LikeFlag = false;
        }
    }
};

const actions = {

};

export default {
// 导出整个demo模块
    state,
    getters,
    actions,
    mutations
};
