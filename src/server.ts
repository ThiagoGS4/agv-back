import express from "express"
import process from "node:process"
import { createServer } from "http"
import { Server } from 'socket.io';
import cors from "cors";
import { db } from "@/db"

const app = express()

const corsUrl = process.env.FRONT_END ?? "http://localhost:5173"

app.use(cors({
  //origin: [corsUrl, '192.168.0.116:5173']
  origin: '*'
}));

app.use(express.json());

try{
  const coll = db.listCollections({}, { nameOnly: true });
for await (const doc of coll) {
  console.log(doc);
}
  
} catch(error){
  console.log("error -> ", error);
  
}


const server = createServer(app)

const io = new Server(server, {
  cors: {
    //origin: [corsUrl, '192.168.0.116:5173'],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.get('/api', (req, res) => {
  res.status(200).json({status: 200, message: 'Servidor HTTP e WebSocket rodando!'});
});

app.put('/api/maps', async (req, res) => {
  const payload = req.body;

  const mapId = payload._id;

  delete payload._id;

  try {
    await db.collection('maps').updateOne(
      { _id: new ObjectId(mapId) },
      { $set: payload },
      { upsert: true }
    );

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Erro no update:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/maps', async (req, res) => {
  const result = await db.collection('maps').findOne()
  res.status(200).json(result);
})

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.emit("hello", { message: "se você está vendo isso, funfou!" });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

import { ObjectId } from "mongodb";
// todo: substituir pelo endereço do esp32 auxiliar que roda mosquito

export { server, io, app }