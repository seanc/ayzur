<style lang="stylus">
  .container
    display flex
    justify-content center
    align-items center
</style>

<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">Sign in</div>
      <div class="panel-body">
        <label for="username" class="sr-only">Username</label>
        <input type="text" id="username" class="form-control" placeholder="Username" required autofocus>
        <label for="password" class="sr-only">Password</label>
        <input type="password" id="password" class="form-control" placeholder="Password" required autofocus>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="true"> Remember Me
          </label>
        </div>
        <button class="btn btn-primary btn-lg btn-block" type="submit">Sign in</button>
      </div>
    </div>
  </div>
</template>
