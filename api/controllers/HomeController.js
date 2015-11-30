var _ = require('underscore'),
	Slack = require('slack-node'),
	apiToken = sails.config.eagle.slackApiKey,
	slack = new Slack(apiToken);

module.exports = {
	
	index: function(req, res) {
		
		slack.api('users.list', function(err, response) {
			
			return res.view('homepage', { data: response });
		
		});
		
		//return res.view('homepage');
		
	},
	
	
	'send': function(req, res) {
		
		var message = req.body.message;
		var exclude = req.body.exclude;
		
		slack.api('users.list', function(err, response) {
			response.members.forEach(function(slacker) {
				//console.log(slacker.real_name + ' ' + slacker.name);
				
				if(!_.contains(exclude, slacker.id) && slacker.id != exclude) {
					
					console.log(exclude, slacker.id);
					
					
					message = message.split('[name]').join(slacker.real_name || slacker.name);
					message = message.split('[url]').join(sails.config.eagle.voteUrl);
					
					slack.api('chat.postMessage', {
						text: message,
						channel: '@' + slacker.name,
						username: sails.config.eagle.botUserName,
						icon_url: sails.config.eagle.botIcon,
						unfurl_links: true
					}, function(err, response){
						//console.log(response);
						sails.sockets.broadcast('eagle', 'message.sent', slacker.real_name || slacker.name);
					});
				}
				
			}, this);
		});
		
		return res.send('ok');
		
	},
	
	
	'join': function(req, res){
		sails.sockets.join(req.socket, 'eagle');

		return res.json({
			message: 'Eagle has landed in the socket.io'
		});
	},
	
};