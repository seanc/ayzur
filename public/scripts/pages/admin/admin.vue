<style lang="stylus" scoped>
  .container
    margin-top 40px
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="panel panel-default">
          <div class="panel-heading">Admin Navigation</div>
          <div class="panel-body">
            <ul class="list-group">
              <li class="list-group-item"><a href="#">Settings</a></li>
              <li class="list-group-item"><a href="#">Users</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
