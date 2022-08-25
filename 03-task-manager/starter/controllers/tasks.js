const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            tasks
        });
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({
            task
        });
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}

// Same as below example
const getTask = async (req, res) => {
    try {
        const {
            id: taskID
        } = req.params; // taskID : everything after main url
        const task = await Task.findOne({
            _id: taskID
        });
        if (!task) {
            return res.status(404).json({
                msg: `No task with this id : ${taskID}` // if there is a same amount of characters but doesn't any id , it will works
            });
        } else {
            res.status(200).json({
                task
            }); // if task exist , it will works
        }
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}
// I did this , it's works 
// const getTask = async (req, res) => {
//     try {
//         const task = await Task.findById(
//             req.params.id
//         );
//         res.status(200).json({
//             task
//         });
//     } catch (error) {
//         res.status(500).json({
//             msg: error
//         });
//     }
// }

// we need to pass in a few  things.
// 1) First we need to pass  in the object where again we set up our condition -> _id : taskID
// 2) We need to pass in that new 'data' since we2re updating something correct. -> req.body
// 3) And we have options object. If we don't use options , our rules in the Model will override.

const updateTask = async (req, res) => {
    try {
        const {
            id: taskID
        } = req.params;
        const task = await Task.findOneAndUpdate({
            _id: taskID
        }, req.body, {
            new: true, // new values return
            runValidators: true // it's lead to make the rules apply again
        })
        if (!task) {
            res.status(404).json({
                msg: `No task with this id : ${taskID}`
            });
        } else {
            res.status(200).json({
                task
            });
            //  res.status(200).json({id:taskID, data:req.body});
        }
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}
const deleteTask = async (req, res) => {
    try {
        const {
            id: taskID
        } = req.params;
        const task = await Task.findOneAndDelete({
            _id: taskID
        });
        if (!task) {
            res.status(404).json({
                msg: `No task with this id : ${taskID}`
            });
        } else {
            res.status(200).json({
                task
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}