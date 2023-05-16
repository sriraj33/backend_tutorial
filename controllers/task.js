import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newtask = async(req, res, next) => {
    try{
        const {title, description} = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Task Added Succesfully"
        })
    }catch(error){
        next(error);
    }

}


export const getMyTasks = async(req, res, next) => {
    try{
        const userId = req.user._id;

        const tasks = await Task.find({ user: userId });
    
        res.status(201).json({
            success: true,
            tasks
        });
    }catch(error){
        next(error);
    }
}


export const updateTask = async(req, res, next) => {
    try{
        const {id} = req.params;

        const task = await Task.findById(id);
    
        if(!task) return next(new ErrorHandler("Invalid ID, Task Not Found", 404))
    
        task.isCompleted = !task.isCompleted;
    
        await task.save();
    
        res.status(201).json({
            success: true,
            message: "Task Updated successfully"
        });
    }catch(error){
        next(error);
    }
}


export const deleteTask = async(req, res, next) => {
    try{
        const { id } = req.params;
        const task = await Task.findById(id);
    
        if(!task) return next(new ErrorHandler("Invalid ID, Task Not Found", 404));
    
    
        await task.deleteOne();
    
        res.json({
            success: true,
            message: "Deleted task"
        });
    
    }catch(error){
        next(error)
    }
}