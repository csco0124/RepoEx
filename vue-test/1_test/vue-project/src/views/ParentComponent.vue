<template>
  <child-component v-on:send-message="sendMessage" />
 </template>
 <script>
 import ChildComponent from './ChildComponent';
 export default {
  components: {ChildComponent},
  methods: {
    sendMessage(data) {
      console.log(data);
    }
  }
 }
 </script>