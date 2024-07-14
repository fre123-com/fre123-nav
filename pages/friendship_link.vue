<template>
  <div class="body">

    <!-- 页面头部 -->
    <header>
      <div class="header-box">
        <div class="header-icon"><img :class="imgCss" @mouseenter="imgCss = 'header-icon-rotate-right'"
            @mouseleave="imgCss = 'header-icon-rotate-left'" src="/public/img/fre123_icon.png"
            width="85px" /><span>Fre123</span></div>
        <div class="header-search" @mouseenter="inputColor = true" @mouseleave="inputColor = false">
          <div @click="waysAll = !waysAll" class="header-search-ways">
            <span class="waysAll">{{ wayType }}</span>
            <ul v-if="waysAll">
              <li v-for="item in typeData" @click="wayType = item.name">{{ item.name }}</li>
            </ul>
          </div>
          <input @focusin="inputClick = true" @focusout="inputClick = false" :class="inputCss" />
          <img src="/public/img/search.png" />
        </div>
        <div class="header-ads">
          <div class="header-ads-smallBox">
            <img src="/public/img/Eyes.png" />
            <text>动漫搜</text>
          </div>
          <div class="header-ads-smallBox">
            <img src="/public/img/right.png" />
            <text>怎么用</text>
          </div>
          <div class="header-ads-smallBox">
            <img src="/public/img/fire.png" />
            <text>资源群</text>
          </div>
        </div>
        <div class="ads-icon">
          <img src="/public/img/ad.png" @click="adClick = !adClick" />
          <ul v-if="adClick">
            <li>
              <img src="/public/img/Eyes.png" />
              <text>动漫搜</text>
            </li>
            <li>
              <img src="/public/img/right.png" />
              <text>怎么用</text>
            </li>
            <li>
              <img src="/public/img/fire.png" />
              <text>资源群</text>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- 页面主要内容 -->
    <main>
      <div class="main-content">
        <div class="main-kinds-box" v-for="(item,index) in  typeData" :key="index">
          <div class="kinds-box-top" v-if="item.name!=='全部'"><strong>{{ item.name }}资源</strong></div>
          <div class="no-link-data" v-if="item.name!=='全部'&&showLink[item.name].length===0">
            <div>暂无资源</div>
          </div>
          <div class="kinds-box-bottom" v-if="item.name!=='全部'&&showLink[item.name].length!==0">
            <div class="box-bottom-box" v-for="link in showLink[item.name]" @click="goLink(link.url)"><img :src="link.logo_url" />{{ link.name}}</div>
          </div>
        </div>
      </div>
    </main>

    <div class="move-people"></div>
    <div class="body-fre123"></div>

    <!-- 页面底部 -->
    <footer>
      <div class="footer-box">
        <div class="footer-top">
          <span><strong>友情链接：</strong></span>
          <ul>
            <li><a>云迹寻宝</a></li>
            <li><a>知了搜</a></li>
            <li><a>FRE123 免费资源导航</a></li>
            <li><a href=""><span>查看更多>>></span></a></li>
          </ul>
        </div>
        <div class="footer-bottom">
          <text>声明：本站内容由网友分享提供。本站不储存、复制、传播任何文件，仅作个人公益学习，请勿非法传播，如有侵权，请联系 1809578063@qq.com 删除</text>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
const imgCss = ref('')

definePageMeta({
  layout: false  // 这行代码告诉 Nuxt 不使用布局
})

const typeData = ref([{ name: '全部' }])
const linkData = ref<any>([])
const showLink = ref<any>({})

// 通过本地获取数据
const getData=()=>{
  const data = localStorage.getItem('friend_data');
  if(data){
    try{
      linkData.value = JSON.parse(data).data;
      // types字段赋值
  for (let i = 0; i < linkData.value.types.length; i++) {
        if (linkData.value.types[i].count !== 0) {
          typeData.value = typeData.value.concat(linkData.value.types[i])
          showLink.value[linkData.value.types[i].name]=[]
        }
      }
      // 获取键名进行类别判断赋值
      let keys = Object.keys(showLink.value);
      // 
      for(let i=0;i<linkData.value.rows.length;i++){
        for(let j =0;j<keys.length;j++){
          if(linkData.value.rows[i].type===keys[j]&&linkData.value.rows[i].status===true){
            showLink.value[keys[j]].push(linkData.value.rows[i])
          }
        }
      }
      console.log("showLink:",showLink.value);
    }catch{
      console.log("JSON数据解析错误");
    }
  }else{
    showLink.value=[];
  }
}

onMounted(async () => { 
  getData();
  // 通过fetch获取数据
  // await fetch('https://raw.githubusercontent.com/linsk27/amz123jsonData/main/friendship_link')
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {

  //     linkData.value = data.data

  //     for (let i = 0; i < linkData.value.types.length; i++) {
  //       if (linkData.value.types[i].count !== 0) {
  //         typeData.value = typeData.value.concat(linkData.value.types[i])
  //         showLink.value[linkData.value.types[i].name]=[]
  //       }
  //     }

  //     // 获取键名进行类别判断赋值
  //     let keys = Object.keys(showLink.value);
  //     for(let i=0;i<linkData.value.rows.length;i++){
  //       for(let j =0;j<keys.length;j++){
  //         if(linkData.value.rows[i].type===keys[j]){
  //           showLink.value[keys[j]].push(linkData.value.rows[i])
  //         }
  //       }
  //     } 
  //     console.log("showLink:",showLink.value);
      
  //   })
  //   .catch(error => {
  //     console.log("get error:", error);
  //   })
  //   .finally(() => {
  //     console.log("fetch over");
  //   })
})

// 输入框聚焦判断css变化板块
const keyword = ref()
const waysAll = ref(false)
const inputColor = ref(false)
const inputClick = ref(false)
const adClick = ref(false)

// 类型选择
const wayType = ref('全部')

// 输入框样式变化
const inputCss = computed(() => {
  if (inputColor.value === true || inputClick.value === true) {
    return "header-search-input"
  }
})

// 链接跳转
const goLink =async(link: string | URL | undefined)=>{
  window.open(link, "_blank");
}

</script>

<style lang="scss" scoped>
li {
  list-style: none;
}


.body {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: auto;
  margin: 0 !important;
}

.body-fre123 {
  position: absolute;
  background-image: url(/public/img/fre123_icon.png);
  background-repeat: no-repeat;
  background-position: center;
  z-index: -99;
  opacity: 0.03;
  height: 100%;
  width: 100%;
}

/* 头部左侧图标样式 */
header {
  background-color: #FFFFFF;
  display: fixed;
  width: 100%;
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #DDDFE2;
  box-shadow: 1px 0px 10px 3px rgba(163, 159, 159, 0.12);
}

.header-icon {
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-left: 30px;
}

.header-icon-rotate-right {
  cursor: pointer;
  transition: transform 0.3s;
  transform: rotate(360deg);
}

.header-icon-rotate-left {
  cursor: pointer;
  transition: transform 0.3s;
  transform: rotate(0);
}

.header-icon span {
  cursor: pointer;
  color: rgb(136 19 55);
}

/* 头部输入框样式 */
.header-search {
  position: relative;
  display: flex;
  align-items: center;
}

.header-search-ways {
  position: absolute;
  margin-left: 30px
}

.waysAll {
  cursor: pointer;
  font-size: 16px;
  padding-right: 10px;
  margin-right: 10px;
  border-right: 2px solid #DDDFE2;
}

.header-search-ways ul {
  position: absolute;
  left: -20px;
  text-align: center;
  background-color: #FFFFFF;
  border: 1px solid #eef1f7;
  box-shadow: 1px 0px 5px 3px rgba(150, 150, 150, 0.12);
  border-radius: 10px;
  margin: 15px 0;
  margin-left: 0;
  padding-left: 0;
}

.header-search-ways ul li {
  cursor: pointer;
  padding: 5px 10px;
}

.header-search-ways ul li:hover {
  background-color: #CBD5E1;
  border-radius: 5px;
}

.header-search input {
  outline: none;
  border-radius: 30px;
  padding-left: 100px;
  padding-right: 35px;
  border: 1px solid #e3e5e9;
  width: 600px;
  height: 45px;
  box-shadow: 1px 1px 10px 2px rgba(88, 85, 85, 0.12);
  transition: all 0.1s ease-in 0.1s
}

.header-search-input {
  border: 1px solid rgb(109, 110, 204) !important;
  box-shadow: 0px 0px 10px 5px rgba(119, 121, 219, 0.12) !important;
}

.header-search img {
  cursor: pointer;
  width: 35px;
  position: absolute;
  right: 0;
  padding-right: 13px;
}

/* 右侧广告样式 */
.header-ads {
  cursor: pointer;
  display: flex;
  margin-right: 50px
}

.header-ads-smallBox img {
  width: 20px;
  margin-right: 5px;
}

.header-ads-smallBox {
  display: flex;
  background-color: #F0F3F7;
  border-radius: 10px;
  margin: 0 5px;
  padding: 10px;
  transition: background-color 0.3s;
}

.header-ads-smallBox:hover {
  background-color: #E2E8F0;
}

// 响应式后的广告点击显示
.ads-icon {
  display: none;
  position: absolute;
  right: 0;
  margin: 20px;
}

.ads-icon img {
  cursor: pointer;
  width: 30px;
}

.ads-icon ul {
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #eef1f7;
  box-shadow: 1px 0px 5px 3px rgba(150, 150, 150, 0.12);
  border-radius: 10px;
  width: 120px;
  margin-left: 0;
  padding-left: 0;
}

.ads-icon ul li {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px;
}

.ads-icon ul img {
  cursor: pointer;
  width: 20px;
  margin-right: 5px;
}

// 友链内容
main {
  flex: 1;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px
}

.main-kinds-box {
  display: flex;
  flex-direction: column;
  width: 800px;
  border-radius: 10px;
  border: 1px solid #eff3f7;
  box-shadow: 1px 0px 5px 3px rgba(233, 228, 228, 0.12);
  margin-bottom: 20px;
}

.kinds-box-top {
  padding: 12px;
  border-bottom: 1px solid #eff3f7;
}

.kinds-box-bottom {
  display: grid;
  grid: 40px/ auto auto auto;
  grid-gap: 10px;
  padding: 10px
}

.no-link-data{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  color: #5b718b;
}

.box-bottom-box {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #eff3f7;
  padding: 8px 0;
}

.box-bottom-box img{
  width: 20px;
  height: auto;
  margin: 0 3px;
}

.box-bottom-box:hover {
  background-color: #F1F5F9;
}

// 页面底部
footer {
  position: relative;
  border-top: 1px solid #DDDFE2;
  box-shadow: 1px 0px 10px 3px rgba(163, 159, 159, 0.12);
  font-size: 12px;
  background-color: white;
}

.footer-box {
  margin: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-top {
  display: flex;
  align-items: center;
}

.footer-top ul {
  display: flex;
  padding-left: 0;
}

.footer-top ul li {
  cursor: pointer;
  margin: 0 5px;
}

.footer-top ul li span {
  margin-left: 10px;
}

.footer-top ul li:hover {
  color: #3B82F6;
}

.move-people {
  position: absolute;
  bottom: 90px;
  background-image: url(/public/img/people.png);
  background-size: 1200px;
  height: 120px;
  width: 100px;
  z-index: -1;
  animation:
    run 2s steps(12) infinite
}

@keyframes run {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -1200px 0;
  }
}

/* 头部响应式 */
@media(max-width: 1400px) {
  .header-search input {
    width: 500px;
  }

  .move-people {
    display: none;
  }
}

@media(max-width: 1100px) {
  .header-search input {
    width: 350px;
  }
}

@media(max-width: 1000px) {
  .header-box {
    flex-direction: column;
    padding-bottom: 22px;
  }

  .header-search input {
    width: 700px;
  }

  .header-ads {
    display: none;
  }

  .ads-icon {
    display: block;
  }
}

@media(max-width: 800px) {
  .header-search input {
    width: 500px;
  }

  .main-kinds-box {
    width: 600px;
  }
}

@media(max-width: 600px) {
  .header-search input {
    width: 350px;
  }

  .main-kinds-box {
    width: 400px;
  }

  .footer-bottom {
    display: none;
  }
}

@media(max-width: 500px) {
  .header-search input {
    width: 350px;
  }

  .main-kinds-box {
    width: 350px;
  }

  .footer-box {
    display: none;
  }
}

@media(max-width: 400px) {
  .header-search input {
    width: 250px;
  }

  .main-kinds-box {
    width: 300px;
  }

  footer {
    display: none;
  }
}
</style>
