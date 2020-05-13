<template>
  <div class='columns'>    
    <div class='column'>
      <h1 class="title">Todo</h1>
      <ul>
        <li>Hand generator
          <ul>
            <li>2 Hands opposite of each other</li>
          </ul>
        </li>
        <li>Push data into other clients</li>
      </ul>
    </div>
    <div class='column'>
      <h1 class="title">Tables</h1>
    </div>    
    <div class='column'>
      <h1 class="title">Friends</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>

<style scoped lang='scss'>
ul {
  li{
    line-height: 27px;
    margin-bottom: 5px;
  }
  li::before {
    padding-left: 2px;
    content: "•  ";
    color: black;
  }
}
ul ul{
  margin-left:15px !important;
  li::before {
    color: #999;
  }  
}
</style>
