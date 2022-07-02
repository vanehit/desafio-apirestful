const socket = io.connect();

socket.on( 'messages', ( data ) => {
  renderMessage( data )
});

function renderMessage( data ){
  const html = data.map( msg => {
    return (`
      <div>
        <strong style="color: blue">${ msg.author }</strong>
        <p style="color: brown; font-size: 14px; display: inline-block">[ ${ msg.date } ] :</p>
        <em style="color: green">${ msg.msg }</em>
      </div>
    `)
  } ).join( "" );
  const chat = document.getElementById( "chat" );
  if( chat ){
    chat.innerHTML = html;
  }
}

const formChat = document.getElementById( "form-chat" );
if ( formChat ) {
  formChat.addEventListener( 'submit', ( e ) => {
    const date = new Date();
    e.preventDefault();
    const newMessage = {
      author: document.getElementById( 'email' ).value,
      msg: document.getElementById( 'text-input' ).value,
      date: date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString()
    }
    socket.emit( 'newMessage', newMessage );
    return false;
  } );
}
