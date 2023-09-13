import { getChannels } from "../API/channelsAPI.js";
import { isChannelExist } from "../API/channelsAPI.js";

export function adminChannels(app, bot) {
  app.post("/admin/channels/all", async (req, res) => {
    const data = await getChannels();
    data.data.forEach( (channel) => {
      if (channel.channel_alias) {
        bot.api.sendMessage(`@${channel.channel_alias}`, req.body.message);
      }
    });
    res.send({msg: 'Message sent'});
  });

  app.get("/admin/channels/all", async (req, res) => {
    const data = await getChannels();
    res.send(data);
  });

  app.post("/admin/channels/:id", async (req, res) => {
    const data = await isChannelExist(req.params.id);
    if (data.data.length > 0) {
      bot.api.sendMessage(`@${req.params.id}`, req.body.message);
    } else {
      res.status(400).send({ error: `${req.params.id} channel/group not found`});
      return;
    }
    res.send({msg: `Message sent to ${req.params.id}`});
  });
}
