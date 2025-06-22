  const socket = io('http://localhost:8000');

  const form = document.getElementById('send-container');
  const messageInp = document.getElementById('messageInp');
  const messageContainer = document.querySelector('.container');

  const append = (message, position) => {
   const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
   messageElement.classList.add(position);    //Corrected line 
    messageContainer.append(messageElement);
      };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value; // Fixed variable name
    append(`You: ${message}`, 'right'); // Corrected string interpolation
    socket.emit('send', message);
    messageInp.value = '';
  });
 const name = prompt('Enter your name to join');
  socket.emit('new-user-joined', name); // Fixed variable name
  socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right'); // Fixed string interpolation
  });

  socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left'); 
  });
