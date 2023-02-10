
import { messageModel } from "./dbModels/models.mjs";
import express from 'express';





const router = express.Router();



//===================================>> message get API <<===============================================

router.get('/messages/:user_id', async (req, res) => {

    try {
        const id = req.body.token._id;
        const userId = req.params.user_id;

        if (!id || !userId) {
            res.status(400).send({
                message: 'forbidden',
                devMessage: `reuired parameter is missing URL`
            })
            return;
        }

        const messages = await messageModel.find({
            or: [
                { from: id, to: userId }, { to: id, from: userId }
            ]
        }).sort({ send_date: -1 }).exec();
        if (messages) {
            res.status(200).send({
                message: 'get all messages',
                data: messages
            })
            return;
        }
        res.status(200).send({
            message: 'no message found',
            data: null
        })


    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



//===================================>> message send API <<===============================================

router.post('/message', async (req, res) => {
    try {

        if (!body.text || !body.sendTo) {

            res.status("400").send({ message: "Invalid input" })
            return;
        }

        const sentMessage = await messageModel.create({
            sender: req.body.token._id,
            send_To: req.body.token._id,
            text: req.body.text
        });
        if (!sentMessage) throw new Error('Something went wrong please try later')

        res.status(200).send({ message: 'message sent successfully ' });

    } catch (error) {
        res.status(500).send({error}||{ message: 'Internal server error' })

    }
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



//===================================>> message delete API <<===============================================

router.delete('/messages/:message_id',async (req, res) => {
 try {
    const messageId = req.params.message_id
    if (!messageId) {
        res.status(400).send({
            message: 'forbidden',
            devMessage: `reuired parameter is missing URL`
        })
        return;
    }



 } catch (error) {
    
 }
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


export default router; 