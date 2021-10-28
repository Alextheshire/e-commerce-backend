const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:[Product]
}).then((catData)=> {
  if(catData.length){
    res.json(catData)
} else {
    res.status(404).json({message:"No categories found!"})
}
}).catch(err=>{
console.log(err);
res.status(500).json({message:"an error occured",err:err})
})
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id,{include: [Product]}).then((catData)=> {
    if(!catData){
      res.status(404).json({message:"No categories found!"})
    }else {
      res.json(catData)
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"an error occured",err:err})
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((category)=> {
    res.status(200).json(category);
  }).catch((error=>{
    console.log(error);
    res.status(400).json({error:error,message:"Creation Failed"})
  }))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then((category)=> {
    res.json(category)
  }).catch((error)=>{
    res.status(400).json({message:"Update Failed", error:error})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: { id:req.params.id}}).then((deleted)=> {
    if(deleted){
      res.json({message: "Delete success",deleted:deleted})
    }else {
      res.status(404).json({message:"No categories found!"})
    }
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({message:"an error occured",err:err})
  })
});

module.exports = router;
