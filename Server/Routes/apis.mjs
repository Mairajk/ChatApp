
import express from 'express';


/** import APIs */
import MessageRoutes from './'





const router = express.Router();



/** ===================================>> message delete API <<=============================================== */

router.use('/message', MessageRoutes)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */



/** ===================================>> message delete API <<=============================================== */

router.post('/message', sendMessage)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */



/** ===================================>> message delete API <<=============================================== */

router.delete('/messages/:id', deleteMesseges)

/** >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */


export default router; 