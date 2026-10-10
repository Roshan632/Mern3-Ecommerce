
import express, { Router } from 'express'
import orderController from '../controllers/orderController'
import userMiddleware, {Role} from '../middleware/userMiddleware'
import errorHandler from '../services/errorHandler'
const router:Router = express.Router()

router.route("/").post(userMiddleware.isUserLoggedIn, errorHandler(orderController.createOrder))
.get(userMiddleware.isUserLoggedIn,errorHandler(orderController.fetchMyOrders))

router.route("/all").get(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), errorHandler(orderController.fetchAllOrders))
router.route("/esewa/checkout/:transactionUuid").get(errorHandler(orderController.redirectToEsewa))
router.route("/esewa/success").get(errorHandler(orderController.handleEsewaSuccess)).post(errorHandler(orderController.handleEsewaSuccess))
router.route("/esewa/failure").get(orderController.handleEsewaFailure)
router.route("/verify-pidx").post(userMiddleware.isUserLoggedIn,errorHandler(orderController.verifyTransaction))

router.route("/admin/change-status/:id").patch(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), errorHandler(orderController.changeOrderStatus))
router.route("/admin/delete-order/:id").post(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), errorHandler(orderController.deleteOrder))
router.route("/cancel-order/:id").patch(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Customer), errorHandler(orderController.cancelMyOrder))
router.route("/:id").get(userMiddleware.isUserLoggedIn,errorHandler(orderController.fetchMyOrderDetail))




export default router