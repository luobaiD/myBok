import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
  // 定义状态，返回一个函数，该函数返回一个对象，对象中的属性即为状态
  state: () => {
    return {
      // 用户信息
      identity: {
        email: '',
        nickname: '',
        phone: '',
        role: '',
      },
      // 用户网站信息
      userWebInfo: {
        token: '',
        account: '',
        password: '',
        registerTime: '',
        lastLoginTime: '',
      },
      // 网站数据
      webData: {
        // 网站名称
        webName: '聚贤阁',
        // 网站访问量
        webVisit: 0,
        // 网站访问人数
        webVisitPerson: 0,
        // 网站状态
        webStatus: '正常',
        // 网站创建时间
        webCreateTime: '2015-01-13',
        // 网站更新时间
        webUpdateTime: '2015-02-22',
        // 网站备案号
        webBeian: '',
      }
    };
  },
  // 获取器，类似于计算属性，用于获取状态的派生值
  getters: {
    
  },
  // 动作，用于修改状态
  actions: {
    
  }
});