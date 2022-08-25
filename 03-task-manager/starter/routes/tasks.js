const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')         - create a new task
// app.get('/api/v1/tasks/:id')         - get single task
// app.patch('/api/v1/tasks/:id')         - update task
// app.delete('/api/v1/tasks/:id')         - delete task



router.route('/').get(getAllTasks).post(createTask);
// When we use 'patch' , we don't have to use all of values.    
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

// Aşagidaki işlem yukarıdaki işlemle aynı şeyi yapar (router.route('/').get(getAllTasks);)
// router.route('/').get((req,res) => {
//     res.send("<h1>All items</h1>")
// })


module.exports = router;