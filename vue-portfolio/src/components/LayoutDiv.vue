<template>
    <div>
      <div class="container2">
        <slot></slot>
      </div>
    </div>
    </template>
      
    <script>
      
    export default {
        name: 'LayoutDiv',
    };
    </script>
    <style>
  .container2 {
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  </style>