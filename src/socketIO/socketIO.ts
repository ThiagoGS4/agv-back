import { mqttClient } from "@/MQTT/mqtt";
import { io } from "@/server";
import { checkNum } from "@/utils/utils";

io.on("teste", (topic, message) => {
  console.log("message -> ", message);
});

mqttClient.on("message", (topic, message) => {
  const messageStr = message.toString().trim();

  switch (topic) {
    case "/agv/squarePassed":
      let agvPos = 0;
      if (checkNum(messageStr)) {
        agvPos = Number(messageStr);
        io.emit("squarePassed", {
          index: agvPos,
        });
      } else {
        console.log(messageStr);
        console.error("ERRO: apenas números são aceitos nesse tópico.", {
          cause: "content is NaN",
        });
      }
      break;
    case "/agv/color/R":
      if (checkNum(messageStr)) {
        io.emit("R", {
          color: Number(messageStr),
        });
      } else {
        console.log(messageStr);
        console.error("ERRO: apenas números são aceitos nesse tópico.", {
          cause: "content is NaN",
        });
      }
      break;
    case "/agv/color/G":
      if (checkNum(messageStr)) {
        io.emit("G", {
          color: Number(messageStr),
        });
      } else {
        console.log(messageStr);
        console.error("ERRO: apenas números são aceitos nesse tópico.", {
          cause: "content is NaN",
        });
      }
      break;
    case "/agv/color/B":
      if (checkNum(messageStr)) {
        io.emit("B", {
          color: Number(messageStr),
        });
      } else {
        console.log(messageStr);
        console.error("ERRO: apenas números são aceitos nesse tópico.", {
          cause: "content is NaN",
        });
      }
      break;
    default:
      console.log("mqtt com mensagem sem caso: ", messageStr);
      break;
  }

  console.log("messageStr --> ", messageStr);
});
