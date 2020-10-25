<template>
 <TabBar>
    <TabarItem path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </TabarItem>
    <TabarItem path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </TabarItem>
    <TabarItem path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </TabarItem>
    <TabarItem path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </TabarItem>
 </TabBar>
</template>

<script type="text/javascript">
  import TabBar from 'components/common/tabbar/TabBar'
  import TabarItem from 'components/common/tabbar/TabarItem'
  export default {
  	name: 'MainTabar',
  	components: {
  		TabBar,
  		TabarItem
  	}
  }
</script>