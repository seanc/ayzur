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
                  <input type="password" id="password" class="form-control" placeholder="Password" v-model="password" v-validate:password="['required', {minlen: 8}]">
                  <span class="help-block" v-if="$validation.password.minlen">Password must be at least 8 characters long</span>
                  <span class="help-block" v-if="$validation.password.matches">Passwords do not match</span>
                  <span class="help-block" v-if="$validation.password.required">Password is required</span>
                </div>
                <!-- <div class="form-group" v-bind:class="!$validation.password.matches ? 'has-success' : 'has-error'">
                  <label for="confirmPassword" class="sr-only">Confirm Password</label>
                  <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" v-model="confirmPassword" v-validate:confirmPassword="['required', 'matches']">
                  <span class="help-block" v-if="$validation.password.matches">Passwords do not match</span>
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
  var alert = require('nr-vue-strap').alert;
  var auth = require('../services/auth');
  module.exports = {
    data: function() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        alertMessage: ''
      };
    },
    validators: {
      matches: {
        check: function() {
          return this.vm.$data.password === this.vm.$data.confirmPassword
        }
      }
    },
    components: {
      alert: alert
    },
    methods: {
      submit: function() {
        auth.register(this, {
          email: this.email,
          password: this.password
        }).then(function(res) {
          if (res.data.ok) {
            return this.updateAlert('success', res.data.data, true);
          }

          this.updateAlert('warning', res.data.data, true);
        }.bind(this)).catch(function(err) {
          this.updateAlert('error', err.data.data, true);
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
