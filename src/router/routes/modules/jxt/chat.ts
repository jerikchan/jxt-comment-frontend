import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const chat: AppRouteModule = {
  path: '/chat',
  name: 'Chat',
  component: LAYOUT,
  redirect: '/chat/chat',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: '记录管理',
  },
  children: [
    {
      path: 'chat',
      name: 'ChatManagement',
      meta: {
        title: '聊天记录',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/jxt/chat/chat/index.vue'),
    },
    {
      path: 'chat_detail/:id',
      name: 'ChatDetail',
      meta: {
        title: '聊天详情',
        ignoreKeepAlive: false,
        hideMenu: true,
        showMenu: false,
        currentActiveMenu: '/chat/chat',
      },
      component: () => import('/@/views/jxt/chat/chat/ChatDetail.vue'),
    },
  ],
};

export default chat;
