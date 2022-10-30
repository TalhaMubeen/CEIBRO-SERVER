const config = require('../config/config');
const backend = config.backendUrl
const getResetPasswordTemplate = (resetPasswordUrl) => {
  return `

      <!doctype html>
      <html lang="en-US">

      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>

      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:10px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                <a href= ${backend} title="logo" target="_blank">
                                  <img width="160" src="https://ceibro.s3.eu-north-1.amazonaws.com/chat_media/logo.png" title="logo" alt="logo">
                                </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                  requested to reset your password</h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                  We cannot simply send you your old password. A unique link to reset your
                                                  password has been generated for you. To reset your password, click the
                                                  following link and follow the instructions.
                                              </p>
                                              <a href="${resetPasswordUrl}"
                                                  style="background:#F1B740;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                  Password</a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p style="font-size:14px; line-height:18px; margin:0 0 0;">&copy; <strong style="color: #F1B740">${backend}</strong></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
      </body>

      </html>

      `;
};

const getInviationEmailTemplate = (url, fromName, fromEmail) => {
  return `

        <!doctype html>
        <html lang="en-US">

        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Ceibro invitation email">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:10px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                  <a href="${backend}" title="logo" target="_blank">
                                    <img width="160" src="https://ceibro.s3.eu-north-1.amazonaws.com/chat_media/logo.png" title="logo" alt="logo">
                                  </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You are invited to join <a href=${url}>Ceibro</a></h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    You've been invited to join the Ceibro by ${fromName} (${fromEmail})
                                                </p>
                                                <a href="${url}"
                                                    style="background:#F1B740;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Join Ceibro</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <p style="font-size:14px; line-height:18px; margin:0 0 0;">&copy; <strong style="color: #F1B740">${backend}</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>

        </html>

        `;
};

const getVerifyEmailTemplate = (verificationEmailUrl) => {
  return `
              <!doctype html>
              <html lang="en-US">

              <head>
                  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                  <title>Reset Password Email Template</title>
                  <meta name="description" content="Reset Password Email Template.">
                  <style type="text/css">
                      a:hover {text-decoration: underline !important;}
                  </style>
              </head>

              <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                  <!--100% body table-->
                  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                      <tr>
                          <td>
                              <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                  align="center" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td style="height:10px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="text-align:center;">
                                      <a href="${backend}" title="logo" target="_blank">
                                          <img width="160" src="https://ceibro.s3.eu-north-1.amazonaws.com/chat_media/logo.png" title="logo" alt="logo">
                                      </a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:20px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                              style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                              <tr>
                                                  <td style="height:40px;">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td style="padding:0 35px;">
                                                      <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Confirm Your Email Address</h1>
                                                      <span
                                                          style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                      Tap the button below to confirm your email address. If you didn't create an account you can safely delete this email
                                                      </p>
                                                      <a href="${verificationEmailUrl}"
                                                          style="background:#F1B740;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Verify</a>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="height:40px;">&nbsp;</td>
                                              </tr>
                                          </table>
                                      </td>
                                  <tr>
                                      <td style="height:20px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="text-align:center;">
                                          <p style="font-size:14px; line-height:18px; margin:0 0 0;">&copy; <strong style="color: #F1B740">${backend}</strong></p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:80px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  <!--/100% body table-->
              </body>

              </html>

          `;
};

const getAccountLockTemplate = (username) => {
  return `
        <!doctype html>
        <html lang="en-US">

        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Account locked</title>
            <meta name="description" content="Account locked.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:10px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                <a href="${backend}" title="logo" target="_blank">
                                    <img width="160" src="https://ceibro.s3.eu-north-1.amazonaws.com/chat_media/logo.png" title="logo" alt="logo">
                                </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Account locked</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    Dear ${username}, Your ceibro account was locked due to wrong password attempts. Please reset your password or retry after 15 minutes.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <p style="font-size:14px; line-height:18px; margin:0 0 0;">&copy; <strong style="color: #F1B740">${backend}</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>

        </html>

    `;
};

module.exports = {
  getVerifyEmailTemplate,
  getResetPasswordTemplate,
  getInviationEmailTemplate,
  getAccountLockTemplate,
};
