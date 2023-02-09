
import { messageModel } from "./dbModels/models.mjs";
import express from 'express';





const router = express.Router();



//===================================>> message get API <<===============================================

router.get('/message/:user_id', async (req, res) => {

    const id = req.body.token._id;
    const userId = req.query.user_id;

    const messages = await messageModel.find({})

})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



//===================================>> message send API <<===============================================

router.post('/message', async (req, res) => {

    if (!body.text || !body.sendTo) {

        res.status("400").send({ message: "invalid input" })
        return;
    }

    const sentMessage = await messageModel.create({
        sender: req.body.token._id,
        send_To: req.body.token._id,
        text: req.body.text
    });

    res.status(200).send({ message: 'message sent successfully ' })

})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



//===================================>> message delete API <<===============================================

router.delete('/messages/:message_id', (req, res) => {

})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>