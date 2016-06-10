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
            <validator name="validation">
              <form novalidate>
                <div class="form-group" v-bind:class="$validation.email.valid ? 'has-success' : 'has-error'">
                  <label for="email" class="sr-only">Email</label>
                  <input type="email" id="email" class="form-control" placeholder="Email" v-model="email" v-validate:email="['email', 'required']">
                  <span class="help-block" v-if="!$validation.email.valid">Input is not a valid email</span>
                </div>
                <div class="form-group" v-bind:class="$validation.password.valid ? 'has-success' : 'has-error'">
                  <label for="password" class="sr-only">Password</label>
                  <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" v-validate:password="['required', {minlen: 8}]">
                  <span class="help-block" v-if="!$validation.password.valid">Password must be at least 8 characters long</span>
                </div>
                <!-- <div class="form-group" v-bind:class="$validation.confirmPassword.valid ? 'has-success' : 'has-error'">
                  <label for="confirmPassword" class="sr-only">Confirm Password</label>
                  <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" v-model="confirmPassword" v-validate:confirmPassword="['required', 'match']">
                  <span class="help-block" v-if="!$validation.confirmPassword.valid">Passwords do not match</span>
                </div> -->
              </form>
            </validator>
            <button class="btn btn-success btn-lg btn-block" type="submit" v-on:click.stop.prevent="submit" :disabled="!$validation.valid">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data: function() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      submit: function() {
        this.$http.post('/api/register', {
          email: this.email,
          password: this.password
        })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        })
        console.log(this.email, this.password)
      }
    }
  }
</script>
