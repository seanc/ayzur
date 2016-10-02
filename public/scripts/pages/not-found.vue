<style lang="stylus" scoped>
  .container
    margin-top 40px
  .huge-text
    font-size 10em
  .text-muted
    margin-bottom 25px
</style>

<template>
  <div class="container">
    <div class="text-center">
      <div class="huge-text">Uh oh...</div>
      <h1>Sorry that page couldn't be found</h1>
      <p class="text-muted">If you believe this is an error, please submit a tciket</p>
      <a v-link="'/'" class="btn btn-primary btn-lg inline">Go back Home</a>
      <a v-link="'/support'" class="btn btn-primary btn-lg inline">Submit a Ticket</a>
    </div>
  </div>
</template>
