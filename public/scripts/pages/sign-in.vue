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
            <alert type="success" v-ref:alert show="false">
              {{ alertMessage }}
            </alert>
            <validator name="validation">
              <form novalidate>
                <div class="form-group" v-bind:class="$validation.email.valid ? 'has-success' : 'has-error'">
                  <label for="email" class="sr-only">Email</label>
                  <input type="email" id="email" class="form-control" placeholder="Email" v-model="email" v-validate:email="['email', 'required']">
                  <span class="help-block" v-if="!$validation.email.valid">Input is not a valid email</span>
                </div>
                <div class="form-group" v-bind:class="$validation.password.valid ? 'has-success' : 'has-error'">
                  <label for="password" class="sr-only">Password</label>
                  <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" v-validate:password="['required']">
                  <span class="help-block" v-if="!$validation.password.valid">Please enter a password</span>
                </div>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="true" v-model="rememberMe"> Remember Me
                  </label>
                </div>
                <div class="form-group clearfix">
                  <a href="#" class="pull-left">Forgot Password</a>
                  <a v-link="'/sign-up'" class="pull-right">Sign up for an account</a>
                </div>
                <button class="btn btn-primary btn-lg btn-block" type="submit" v-on:click.stop.prevent="submit" :disabled="!$validation.valid">Sign in</button>
              </form>
            </validator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var auth = require('../services/auth.js');
  var alert = require('nr-vue-strap').alert;

  module.exports = {
    data: function() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        alertMessage: ''
      };
    },
    components: {
      alert: alert
    },
    methods: {
      submit: function() {
        auth.login(this, {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe
        })
        .then(function(res) {
          this.$root.loggedIn = auth.check();
          this.$root.username = res.data.data.username;
          this.$root.email = res.data.data.email;

          this.$route.router.go('/');
        }.bind(this))
        .catch(function(err) {
          this.updateAlert('danger', err.data.data, true);
        }.bind(this));
      },
      updateAlert: function(type, message, show) {
        this.$refs.alert.type = type;
        this.alertMessage = message;
        this.$refs.alert.show = show;
      }
    }
  }
</script>
