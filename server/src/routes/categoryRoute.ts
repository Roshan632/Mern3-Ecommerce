// import express,{Router} from 'express'
// import categoryController from '../controllers/categoryController'

// const router:Router= express.Router()

// router.route("/").get(categoryController.getCategories).post(categoryController.addCategory)
// router.route("/:id").patch(categoryController.updateCategory).delete(categoryController.deleteCategory)

// export default router





import express,{Router} from 'express'
import categoryController from '../controllers/categoryController'
import userMiddleware,{ Role } from '../middleware/userMiddleware'
const router:Router = express.Router()

// router.route("/").get(categoryController.getCategories).post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo("Admin"),categoryController.addCategory)
// router.route("/:id").patch(categoryController.updateCategory).delete(categoryController.deleteCategory)
router.route("/").get(categoryController.getCategories).post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin),categoryController.addCategory)
router.route("/:id").patch(userMiddleware.isUserLoggedIn,userMiddleware.accessTo(Role.Admin), categoryController.updateCategory).delete(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), categoryController.deleteCategory)


export default router