import { connect } from "mqtt";

const mqttClient = connect('mqtt://localhost', {
  timerVariant: 'native',
  port: 1883
});

mqttClient.on("connect", () => {
  console.log("[MQTT] Conectado ao broker com sucesso!");
  mqttClient.subscribe("presence");
  mqttClient.subscribe("/agv/squarePassed");
  mqttClient.subscribe("/agv/color/R");
  mqttClient.subscribe("/agv/color/G");
  mqttClient.subscribe("/agv/color/B");
  mqttClient.subscribe("/agv/atBase");
  mqttClient.subscribe("/agv/goingBack");
});

mqttClient.on("error", (err) => {
  console.error("[MQTT Erro Crítico] Falha ao conectar no Broker:", err.message);
});

// mqttClient.on("message", (topic, message) => {
//   console.log(message.toString());

//   if(message.length > 0){
//     console.log("mandando para web socket");
//     io.emit("frommqtt", { message: "veio do mqtt!" })
//   } else {
//     console.log("mensagem vazia");
//   }
//   //client.end();
// });

export { mqttClient };
