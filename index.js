var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
	console.log("Nueva conexion");
	
	socket.on("nuevomensaje", function(mensaje){
		io.emit("nuevomensaje", mensaje);
	});
	
	socket.on("disconnect", function(){
		console.log("Desconexión");
	});
});


http.listen(3000, function() {
	console.log("listen in 3000");
});