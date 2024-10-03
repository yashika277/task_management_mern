const catchAsyncErrror  = require("../middlewares/catchAsyncError")
const { ErrorHandler } = require("../middlewares/error")
const { task } = require("../models/task.model")

const createTask = catchAsyncErrror(async (req, res, next) => { })

const deleteTask = catchAsyncErrror(async (req, res, next) => { })

const updateTask = catchAsyncErrror(async (req, res, next) => { })

const getMyTask = catchAsyncErrror(async (req, res, next) => { })

const getSingleTask = catchAsyncErrror(async (req, res, next) => { })



module.exports = { createTask, deleteTask, updateTask, getMyTask, getSingleTask }




