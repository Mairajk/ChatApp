/** import models */
import MessageModel from '../../db/models/Messages.mjs'


export default async (req, res) => {

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

        const messages = await MessageModel.find({
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
};