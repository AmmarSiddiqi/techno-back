const messageSockets = (io) => {
	io.on("connect", (socket) => {
		socket.on("joinMyId", id => {
			socket.join(id);
		})
		socket.on("message", (data) => { 
			io.to(data.id).emit("notification", data);
			io.to(data.id).emit("user-message",data);
			io.to(data.sender).emit("user-message",data);
		})
	})
}

export default messageSockets;