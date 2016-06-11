Ti.SignInWith
=============

This is a generic module for signin and retreiving profile informations.
Oauth is included. You need appId and appSecret. Both must be added to tiapp.xml as String property

![](https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png) 
![](https://api.slack.com/img/sign_in_with_slack.png)


The actual module will be visible next days. ;-)

Usage
-----

It is a very simple API:

~~~

var SignIn = require('de.appwerft.signinwith');

// we have two methods:
// first getting profile, if not signed in a login screen is generated:
SignIn.getProfile('slack', function(_e) {
    alert(_e.data);
});

// second, a simple helper function for other purpose:
var bearer = SignIn.getAccessToken('linkedin');
~~~

Currently the module supports slack, meetup, linkedin, facebook, twitter, google+, xing

You will get a result like this: 


![](https://raw.githubusercontent.com/AppWerft/Ti.LinkedIn/master/documentation/res.png)



For all request you need scopes (see documentation). As allowed redirect_uri you must add  'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png'. This is dirty workeround, because LinkedIn doesn't support oob.

These are entry in you tiapp.xml:

~~~
<property name="linkedin_id" type="string">7798****xfs</property>
<property name="linkedin_secret" type="string">wqApS***54G8Ky</property>

/* optional*/
<property name="linkedin_redirecturl" type="string">https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png</property>

~~~

You need these entries:

![](https://raw.githubusercontent.com/AppWerft/Ti.LinkedIn/master/documentation/screen.png)