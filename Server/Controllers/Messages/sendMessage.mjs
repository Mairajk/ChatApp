/** import models */
import MessageModel from '../../db/models/Messages.mjs'


export default async (req, res) => {
    try {

        if (!body.text || !body.sendTo) {

            res.status("400").send({ message: "Invalid input" })
            return;
        }

        const sentMessage = await MessageModel.create({
            sender: req.body.token._id,
            send_To: req.body.token._id,
            text: req.body.text
        });
        if (!sentMessage) throw new Error('Something went wrong please try later')

        res.status(200).send({ message: 'message sent successfully ' });

    } catch (error) {
        res.status(500).send({ error } || { message: 'Internal server error' })

    }
}