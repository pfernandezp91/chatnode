require("dotenv/config");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
var Users = require("./models/user");
var mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', console.error.bind(console, "Error al conectar a la base"));
db.once('open', function(callback){
	console.log('Nos conectamos correctamente');
});


app.get("/users", async (req, res) => {
	try {
		var arrayUsersDB = await Users.find();
		res.jsonp(arrayUsersDB);
	} catch (error) {
		console.log(error);
	}
});


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

http.listen(port, function(){
    console.log('listening on :' + port);
});