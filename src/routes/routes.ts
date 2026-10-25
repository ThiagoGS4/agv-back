import { mqttClient } from '@/MQTT/mqtt'
import { app } from '@/server'

app.post('/api/command', async (req, res) =>{
    mqttClient.publish('/agv/command', JSON.stringify(req.body))
    res.sendStatus(202)
})