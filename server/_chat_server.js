module.exports ={
    createServer:(app_context)=>{

    },

    run: (server_context) => {


        var io = require('socket.io')(server_context);
        io.on("Streamer_online",data=>{
            console.log(data);
        })
        io.on('connection', socket => {
            
            

            socket.on("ROOM", (data) => {
            
                socket.join(data.room);
               

            });
            socket.on("GET_VIEWS", (data) => {
                var room = io.sockets.adapter.rooms[data.room];
                io.emit("VIEWS",room.length);
            });

            socket.on("SEND_MESSAGE", data => {
               
                io.in(data.room).emit("MESSAGE",data);
            })
            socket.on("LEAVEROOM", (data) => {
             
                var room = io.sockets.adapter.rooms[data.room];
        
                socket.leaveAll();
                try {
                    let view = room.length;
                    io.emit("VIEWS",room.length);
                } catch (error) {
                    console.error(error);
                }
                
            });
            

        })
      
        

    }


}
