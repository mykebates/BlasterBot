//$(document).foundation();

$(function() {
	
	$('.soar').on('click', function() {
		$.post( '/home/send', $('#egg').serialize() );
		return false;
	});
	
	
	io.socket.get('/home/join', function serverResponded(body, JWR) {});
	
	io.socket.on('message.sent', function onServerSentEvent (msg) {
        if(!$('.success_list').is(':visible')) {
			$('.success_list').fadeIn();
		}
		
		$('.success_list').append('<li>'+ msg +'</li>');
    });
	
});