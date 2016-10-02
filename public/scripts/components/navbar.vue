<style lang="stylus" scoped>
  .navbar
    margin-bottom 0
</style>

<template>

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
