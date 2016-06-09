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
          <div class="panel-heading">Sign up</div>
          <div class="panel-body">
            <div class="form-group">
              <label for="email" class="sr-only">Email</label>
              <input type="email" id="email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <label for="password" class="sr-only">Password</label>
              <input type="password" id="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="c-password" class="sr-only">Confirm Password</label>
              <input type="password" id="c-password" class="form-control" placeholder="Confirm Password">
            </div>
            <button class="btn btn-success btn-lg btn-block" type="submit">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>
