<style lang="stylus" scoped>
  .container
    padding-top 40px
  .row
    display flex
    justify-content center
    align-items center
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="panel panel-default">
          <div class="panel-heading">Sign in</div>
          <div class="panel-body">
            <div class="form-group">
              <label for="username" class="sr-only">Email</label>
              <input type="text" id="username" class="form-control" placeholder="Username" required autofocus>
            </div>
            <div class="form-group">
              <label for="password" class="sr-only">Password</label>
              <input type="password" id="password" class="form-control" placeholder="Password" required>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" value="true"> Remember Me
              </label>
            </div>
            <div class="form-group clearfix">
              <a href="#" class="pull-left">Forgot Password</a>
              <a v-link="'/sign-up'" class="pull-right">Already have an account?</a>
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
