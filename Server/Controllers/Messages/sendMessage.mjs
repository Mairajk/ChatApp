/** import models */
import MessageModel from '../../db/models/Messages.mjs';


export default async (req, res) => {
    try {

        const { body: { text, sendTo } } = req;

        if (!text || !sendTo) {

            res.status('400').send({ message: 'Invalid input' });
            return;
        }

        const sentMessage = await MessageModel.create({
            text,
            sender: req.body.token._id,
            send_To: req.body.token._id,
        });

        if (!sentMessage) throw new Error('Something went wrong please try later');

        res.status(200).send({ message: 'message sent successfully ' });

    } catch (error) {
        res.status(500).send({ error } || { message: 'Internal server error' });

    }
};