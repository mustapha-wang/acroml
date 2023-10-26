<script setup>console.log('sfc setup');
  import { ref,onMounted,onBeforeUnmount,onUnmounted,onActivated,onDeactivated} from 'vue';
  import About from './com.about.vue';
  const count = ref(0);
  onMounted(function(){
    console.log('sfc mounted');
  });
  onBeforeUnmount(function(){
    console.log('sfc onBeforeUnmount');
  });
  onUnmounted(function(){
    console.log('sfc onUnmounted');
  });
  onActivated(function(){
    console.log('sfc activated');
  });
  onDeactivated(function(){
    console.log('sfc deactivated');
  });
  function add(a){
    return a+10;
  }
</script>

<template>
  <span>------from file:page.sfc.vue------</span>
  <div>demo: vue SFC(Single File Compoennt),*.vue</div>
  <button @click="count++">{{t('Click me')}}</button>
  <span>You clicked me {{ count }} times.</span>
  <span>{{add(count)}}</span>
  <h1>china,shanghai</h1>
  <div>current LCID:{{LCID}},{{ t('Home') }}</div>
  <div>{{ t('Home') }}</div>
  <About></About>
</template>

<style>
  h1{
    font-size: large;
    color:red;
  }
</style>