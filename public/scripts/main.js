/* global $ */

var defaultIcons = {
  valid: 'glyphicon glyphicon-ok',
  invalid: 'glyphicon glyphicon-remove',
  validating: 'glyphicon glyphicon-refresh'
};

$(function() {
  $('#login-form').formValidation({
    framework: 'bootstrap',
    icon: defaultIcons,
    fields: {
      emailOrUsername: {
        validators: {
          notEmpty: {
            message: 'Email or Username is required'
          },
          blank: {}
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'Password is required'
          }
        }
      }
    }
  }).on('success.form.fv', function(e) {
    e.preventDefault();

    var form = $(e.target).serialize();

    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: form,
      success: function(res) {
        console.log(res);
      }
    });
  });

  $('#registration-form').formValidation({
    framework: 'bootstrap',
    icon: defaultIcons,
    fields: {
      email: {
        validators: {
          notEmpty: {
            message: 'Email is address is required'
          },
          emailAddress: {
            message: 'Incorrect email format'
          },
          blank: {}
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'Password is required'
          },
          stringLength: {
            min: 8,
            message: 'Password should be at least 8 characters long'
          },
          indentical: {
            field: 'confirmPassword',
            message: 'Passwords do not match'
          }
        }
      },
      confirmPassword: {
        validators: {
          notEmpty: {
            message: 'Confirmation password is required'
          },
          identical: {
            field: 'password',
            message: 'Passwords do not match'
          }
        }
      }
    }
  });
});
