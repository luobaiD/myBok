import {defineStore} from 'pinia';
import router from '@/router/index';

export const useUserStore = defineStore('user', {
  // 定义状态，返回一个函数，该函数返回一个对象，对象中的属性即为状态
  state: () => {
    return {
      /**
       * 用户身份信息
       * @param email 邮箱
       * @param nickname 昵称
       * @param phone 手机号
       * @param role 身份
       */
      identity: {
        email: '',
        nickname: '',
        phone: '',
        role: '',
      },
      /**
       * 用户登录信息
       * @param token 登录凭证
       * @param account 账号
       * @param password 密码
       * @param registerTime 注册时间
       * @param lastLoginTime 上次登录时间
       */
      userWebInfo: {
        token: '',
        account: '',
        password: '',
        registerTime: '',
        lastLoginTime: '',
      },
      /**
       * 网站信息
       * @param webName 网站名称
       * @param webVisit 网站访问量
       * @param webVisitPerson 网站访问人数
       * @param webStatus 网站状态
       * @param webCreateTime 网站创建时间
       * @param webUpdateTime 网站更新时间
       * @param webBeian 网站备案号
       */
      webData: {
        webName: '聚贤阁',
        webVisit: 0,
        webVisitPerson: 0,
        webStatus: '正常',
        webCreateTime: '2015-01-13',
        webUpdateTime: '2015-02-22',
        webBeian: '',
      },
      /**
       * 网站导航栏  当有子导航栏时,则不会再有fun函数
       * @param title 标题
       * @param icon 图标
       * @param path 路径
       * @param fun 点击事件
       * @param children 子导航栏
       */
      titleData: [
        {
          title: '首页',
          icon: 'HomeFilled',
          path: '/',
          fun: () => {
            router.push('/')
          }
        },
        {
          title: '辩论',
          icon: 'Scissor',
          path: '/',
          fun: () => {
            console.log('点击了辩论')
          }
        },
        {
          title: '留言',
          icon: 'Message',
          path: '/message',
          fun: () => {
            console.log('点击了留言')
          }
        },
        {
          title: '设置',
          icon: 'Setting',
          path: '/setting',
          fun: () => {
            console.log('点击了设置')
          }
        },
        {
          title: '游戏',
          icon: 'Monitor',
          path: '/game',
          children: [
            {
              title: '别踩白块儿',
              path: '/game/snake',
              fun: () => {
                console.log('点击了别踩白块儿')
              }
            },
            {
              title: '俄罗斯方块',
              path: '/game/tetris',
              fun: () => {
                console.log('点击了俄罗斯方块')
              }
            },
            {
              title: '俄罗斯方块',
              path: '/game/tetris',
              fun: () => {
                console.log('点击了俄罗斯方块')
              }
            }
          ]
        },
        {
          title: '登录',
          icon: 'Avatar',
          path: '/login',
          fun: () => {
            router.push('/login')
          }
        }
      ]
    };
  },
  // 获取器，类似于计算属性，用于获取状态的派生值
  getters: {
    
  },
  // 动作，用于修改状态
  actions: {
    
  }
});