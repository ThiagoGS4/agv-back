import { server } from '@/server'
import './MQTT/mqtt';
import '@/socketIO/socketIO';
import '@/routes/routes'

const port = process.env.PORT ?? "4000"

server.listen(Number(port), "0.0.0.0", () =>{
  console.log(`Servidor rodando na porta ${port}`);
});

