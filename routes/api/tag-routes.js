const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[Product]
}).then((tagData)=> {
  if(tagData.length){
    res.json(tagData)
} else {
    res.status(404).json({message:"No tags found!"})
}
}).catch(err=>{
console.log(err);
res.status(500).json({message:"an error occured",err:err})
})
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{include: [Product]}).then((tagData)=> {
    if(!tagData){
      res.status(404).json({message:"No tags found!"})
    }else {
      res.json(tagData)
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"an error occured",err:err})
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((tag)=> {
    res.status(200).json(tag);
  }).catch((error=>{
    console.log(error);
    res.status(400).json({error:error,message:"Creation Failed"})
  }))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then((tag)=> {
    res.json(tag)
  }).catch((error)=>{
    res.status(400).json({message:"Update Failed", error:error})
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: { id:req.params.id}}).then((deleted)=> {
    if(deleted){
      res.json({message: "Delete success",deleted:deleted})
    }else {
      res.status(404).json({message:"No tags found!"})
    }
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({message:"an error occured",err:err})
  })
});

module.exports = router;
