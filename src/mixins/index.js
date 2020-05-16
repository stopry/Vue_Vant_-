// import Api from '@/axios'
export default {
  data: function () {
    return {}
  },
  methods: {
    checkTimer(startTime, endTime, newDate) {
      if (endTime >= newDate && startTime < newDate) {
        return {code: 1, msg: '热议中'} // 活动正在开始
      }
      if (startTime > newDate) {
        return {code: 2, msg: '未开始'}// 未开始
      }
      if (endTime < newDate) {
        return {code: 0, msg: '已结束'} // 已结束
      }
    }
  }
}
