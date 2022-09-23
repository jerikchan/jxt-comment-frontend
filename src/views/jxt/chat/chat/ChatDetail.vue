<template>
  <PageWrapper :title="`用户` + userId + `的聊天记录`" contentBackground @back="goBack">
    <template #extra>
      <a-button type="primary" danger> 删除记录 </a-button>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <a-list
        class="comment-list"
        :header="`${data.length} replies`"
        item-layout="horizontal"
        :data-source="data"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment :author="item.author" :avatar="item.avatar">
              <template #actions>
                <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
              </template>
              <template #content>
                <p>
                  {{ item.content }}
                </p>
              </template>
              <template #datetime>
                <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{ item.datetime.fromNow() }}</span>
                </a-tooltip>
              </template>
            </a-comment>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { List, Comment } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);

  export default defineComponent({
    name: 'AccountDetail',
    components: { PageWrapper, AList: List, AComment: Comment },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('detail');
      const { setTitle } = useTabs();
      // TODO
      // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

      // 设置Tab的标题（不会影响页面标题）
      setTitle('聊天详情：用户' + userId.value);

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/chat/chat');
      }
      const data = [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: dayjs().subtract(1, 'days'),
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: dayjs().subtract(2, 'days'),
        },
      ];
      return { userId, currentKey, goBack, data };
    },
  });
</script>

<style></style>
