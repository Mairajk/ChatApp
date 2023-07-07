
import express from 'express';


/** import controllers */
import sendMessage from '../../Controllers/Messages/sendMessage.mjs';
import deleteMesseges from '../../Controllers/Messages/deleteMesseges.mjs';
import getChatMessages from '../../Controllers/Messages/getChatMessages.mjs';




const router = express.Router();



/** ===================================>> message delete API <<=============================================== */

router.get('/chat/:id', getChatMessages)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */



/** ===================================>> message delete API <<=============================================== */

router.post('/', sendMessage)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */



/** ===================================>> message delete API <<=============================================== */

router.delete('/:id', deleteMesseges)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */


export default router; 