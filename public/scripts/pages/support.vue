<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <div class="panel panel-default">
          <div class="panel-heading">Submit a ticket</div>
          <div class="panel-body">
            <div class="alert alert-waring">
              <strong>Note!</strong> Please look at the "Commonly asked questions" section before submitting a ticket
            </div>
            <validator name="validation">
              <form>
                <div class="form-group">

                </div>
              </form>
            </validator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var auth = require('../services/auth');

  var authenticated = auth.check();

  console.log(authenticated);
</script>
