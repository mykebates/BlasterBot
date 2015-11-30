# BlasterBot

Send a personalized message to everyone in your Slack group.  Optionally chose who NOT to send the message to.

Create config/eagle.js

```
module.exports.eagle = {
	
	'slackApiKey': 'APIKEY',
	'voteUrl': 'https://app.reviewr.com/gsb/pitch?evtid=1305517&group=1305626&subid=1350528',
	'botUserName': 'Focus Eagle',
	'botIcon': 'http://eaglespeak.co/eagle.png'
	
};
```

Run with 
```
sails lift
```