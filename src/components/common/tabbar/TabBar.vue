<template>
     <div id="tab-bar">
     	<slot></slot>
     </div>
</template>

<script type="text/javascript">
	export default {
		name: 'TabBar',
	}
</script>

<style type="text/css">
 #tab-bar {
    display: flex;
    background-color:  #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -1px 2px rgba(100,10,100, .1);
  }
</style> 