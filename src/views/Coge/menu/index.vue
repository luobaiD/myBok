<template>
  <div class="menu-whole">
    <div class="tag" v-for="(item, indexF) in Tagdata">
      <!-- 父级标签 -->
      <div class="tag-One"  @click="OneisShow(item, indexF)">
        {{ item.name }}
        <div class="icon" v-if="item.children" :style="{ transform: item.show ? 'rotate(-180deg)' : 'rotate(0deg)' }">
          <el-icon><ArrowDownBold /></el-icon>
        </div>
      </div>
      <!-- 子级标签 下拉过渡动画未能实现，已使用改变标签高度(无效),改变标签dispaly属性-->
      <div class="tag-children" v-show="item.show" :style="{maxHeight: 'item.maxHeight * item.children?.length' + 'px'}">
        <div class="tag-two" v-for="(i, index) in item.children" @click="SonisShow(i, indexF, index)"
        :style="{ right: i.show ? '-40px' : '0px'}">
          <p>{{ i.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const Tagdata = ref([
  {
    name: 'Html',
    show: true,
    maxHeight: 40,
    children: [
      {
        name: '按钮',
        router: 'button',
        show: true,
      },
      {
        name: '表单',
        router: 'form',
        show: false,
      },
    ],
  },
  {
    name: 'JavaScript',
    show: false,
    maxHeight: '0px',
    children: [
      {
        name: '数组',
        router: 'array',
        show: false,
      },
      {
        name: '对象',
        router: 'object',
        show: false,
      },
    ],
  },
  {
    name: 'Vue',
    show: false,
    maxHeight: '0px',
  },
])
/**
 * 菜单标签数据
 * 通过该标签使父级和子集标签同时只有一个show的状态为true
 */
let MenuTag = ref({
  father: 0,
  son: {
    father: 0,
    son: 0,
  },
});
/**
 * 父级标签的点击事件
 * @param item 点击事件来自于Tagdata对应的父级标签
 * @param index 点击事件来自于v-for循环的下标
 */
const OneisShow = (item: any, index: number) => {
  item.show = !item.show
  if (MenuTag.value.father == index) {
    return
  }
  if(Tagdata.value[MenuTag.value.father].show == false){
    MenuTag.value.father = index;
    return
  }
  Tagdata.value[MenuTag.value.father].show =!Tagdata.value[MenuTag.value.father].show;
  MenuTag.value.father = index;
  
}
/**
 * 子级标签的点击事件
 * @param item 
 */
const SonisShow = (item: any, i:number, index:number) => {
  // 如果点击的是当前已经展开的子级标签，则不进行任何操作
  if (MenuTag.value.son.father == i && MenuTag.value.son.son == index) {
    return
  }
  // 关闭之前展开的子级标签
  const parentItem = Tagdata.value[MenuTag.value.son.father];
  if (parentItem?.children?.[MenuTag.value.son.son]?.show) {
    parentItem.children[MenuTag.value.son.son].show = false;
  }

  // 设置新的父级和子级标签索引
  MenuTag.value.son.father = i;
  MenuTag.value.son.son = index;

   // 切换当前点击的子级标签的显示状态
  item.show = true;
  console.log(`/coge/${Tagdata.value[i].name}-${item.router}`);
  
  router.push(`/coge/${Tagdata.value[i].name}-${item.router}`);
}

onMounted(() => {
  router.push(`/coge/Html-button`);
})
</script>

<style scoped lang="scss">
  // 整体样式
  .menu-whole{
    width: 250px;
    height: 100%;
    user-select: none;
    background-color: #191919;
    display: flex;
    flex-direction: column;
    align-items: center;
    // 父级标签集
    .tag{
      width: 100%;
      color: #E5EAF3;
      background-color: #363434;
      border: 1px solid #E5EAF3;
      display: flex;
      flex-direction: column;
      // 父级标签
      .tag-One{
        width: 100%;
        height: 50px;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        // 父级标签图标
        .icon{
          width: 20px;
          height: 20px;
          margin-left: 30px;
          font-size: 14px;
          position: absolute;
          top: 15px;
          right: 20px;
          transition: all 0.5s;
        }
      }
      // 子级标签集
      .tag-children{
        width: 100%;
        display: flex;
        flex-direction: column;
        transition: all 1s ease-in-out;
        // 子级标签
        .tag-two{
          width: 100%;
          height: 40px;
          margin-bottom: 5px;
          font-size: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transition: all 1s;
          // 子级标签文字
          p{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%);
            color: #191919;
            background-color: rgb(252, 239, 239);
          }
        }
      }
    }
  }
</style>