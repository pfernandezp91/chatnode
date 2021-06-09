require("dotenv/config");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
	//var cursor = data;
	console.log(data);
});

/*mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, ()=> console.log("conexion realizada"));*/

io.on("connection", function(socket){
	console.log("Nueva conexion");
	
	socket.on("nuevomensaje", function(mensaje){
		io.emit("nuevomensaje", mensaje);
	});
	
	socket.on("disconnect", function(){
		console.log("Desconexión");
	});
});

/*http.listen(3000, function() {
	console.log("listen in 3000");
});*/

//conexion a la base de datos
/*mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("Estás conectado a tu base de datos")
)*/

http.listen(port, function(){
    console.log('listening on :' + port);
});

//app.listen(port);