<style lang="stylus" scoped>
  .navbar
    margin-bottom 0
</style>

<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" v-link="{path: '/'}">Ayzur Network</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="main-navbar">
        <ul class="nav navbar-nav">
          <li v-link-active><a v-link="{path: '/', exact: true}">Home <span class="sr-only">(current)</span></a></li>
          <li v-link-active><a v-link="{path: '/support', exact: true}">Support</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-link-active> Statistics <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Teams</li>
              <li><a href="#">Leaderboard</a></li>
              <li><a href="#">Team</a></li>
              <li class="dropdown-header">Sectors</li>
              <li><a href="#">Leaderboard</a></li>
              <li class="dropdown-header">Practice</li>
              <li><a href="#">Leaderboard</a></li>
              <li><a href="#">Elo</a></li>
              <li><a href="#">Time Played</a></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right" v-if="!$root.loggedIn">
          <li><a v-link="'/sign-in'">Sign in</a></li>
          <li><a v-link="'/sign-up'">Sign up</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right" v-else>
          <li><a href="#">Link</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ email }} <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li v-if="!username"><a href="#">Link Minecraft Account</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  var user = require('../services/user');

  module.exports = {
    data: function() {
      return {
        email: user.getEmail(),
        username: user.getUsername()
      };
    }
  };
</script>
