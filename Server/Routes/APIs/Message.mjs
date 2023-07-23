
import express from 'express';


/** import controllers */
import sendMessage from '../../Controllers/Messages/sendMessage.mjs';
import deleteMesseges from '../../Controllers/Messages/deleteMesseges.mjs';
import getChatMessages from '../../Controllers/Messages/getChatMessages.mjs';




const router = express.Router();

console.log('---------------- in message Routes ------------------');


/** ===================================>> message delete API <<=============================================== */

router.get('/', getChatMessages)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */



/** ===================================>> message delete API <<=============================================== */

router.post('/', sendMessage)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */



/** ===================================>> message delete API <<=============================================== */

router.delete('/:id', deleteMesseges)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */


export default router; 