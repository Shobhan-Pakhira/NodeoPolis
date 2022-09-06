const router = require ( 'express').Router();
const ToDo = require('../model/ToDo');


// ALL THE TYPES OF REQUEST WE NEED TO DO ARE FOLLOWING:
// List All To-do
router.get('/', (req,res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    ToDo.find()
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .exec((err,ToDo)=>{
        if(err){
            return res.json({error: err});
        }
        return res.json({data: ToDo});
    });
});


//Create A To-do (Naming Convention is important)
router.post('/create', (req,res)=>{
    const Todo=ToDo({
        title: req.body.title,
        content: req.body.content,
    });
    Todo.save((err,ToDo) =>{
        if(err){
            return res.json({error: err});
        }
        return res.json({data: ToDo});
    });
});


//Edit A To-Do
router.put('/:id', (req,res)=>{
    ToDo.findById(req.params.id).exec((err,ToDo) =>{
        if(err){
            return res.json({error: err});
        }
        ToDo.title = req.body.title;
        ToDo.content = req.body.content ?? ToDo.content
        ToDo.completed = req.body.completed ?? ToDo.completed;
        ToDo.save((err,ToDo) =>{
            if(err){
                return res.json({error: err});
            }
            return res.json({data: ToDo});
        })
    });
});


//Delete A To-Do
router.delete('/:id', (req,res)=>{
    ToDo.remove({
        _id: req.params.id
    }).exec((err,result) => {
        if(err){
            return res.json({error: err});
        }
        if(result.deletedCount == 0){
            return res.json({data:"No ToDo Found With Given ID"});
        }
        return res.json({data: "Deleted Succesfully"});
    });
});

//Exporting the Routes
module.exports=router;
