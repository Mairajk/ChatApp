/** import models */
import MessageModel from '../../db/models/Messages.mjs'



export default async (req, res) => {
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

        console.log('Error ------------------>', error);

    }
}