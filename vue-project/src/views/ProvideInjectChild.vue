<template>
    <div></div>
    </template>
    <script>
    export default {
      inject: ['itemLength'],
      mounted() {
        alert(this.itemLength);
      }
    }
    </script>