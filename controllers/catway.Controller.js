const Catway = require ('../models/catway.model');

//Afficher la liste des catway
exports.getAllCatways = async (req, res)=>{
   try {
        const catways = await Catway.find();
        return res.status(200).json(catways);
   }catch (error){
        return res.status(500).json(error);
   }
};

//Afficher un catway déterminé
exports.getCatwayById = async (req, res)=>{
   const id=req.params.id;
   try {
        const catway = await Catway.findById(id);
        if (!catway) {
            return res.status(404).json('catway_not_found');
        }
        return res.status(200).json(catway);
   }catch (error){
        return res.status(500).json(error);
   }
};

//Créer un nouveau catway
exports.createCatway = async (req, res)=>{
   let catwayBuffer = {
     catwayNumber:req.body.catwayNumber,
     catwayType:req.body.catwayType,
     catwayState:req.body.catwayState
   };
   try {
        let newCatway = await Catway.create(catwayBuffer);
        return res.status(201).json(newCatway);
   }catch (error){
        return res.status(500).json(error);
   }
};

//Modifier les champs d'un catway donné
exports.updateCatway = async (req, res)=>{
   const id=req.params.id;
   let catwayBuffer = {
     catwayNumber:req.body.catwayNumber,
     catwayType:req.body.catwayType,
     catwayState:req.body.catwayState
   };
   try {
        let modifiedCatway = await Catway.findByIdAndUpdate(
          id,
          catwayBuffer,
          {new:true}
        );
        if (!modifiedCatway){
          return res.status(404).json('catway_not_found');
        } 
        return res.status(201).json(modifiedCatway);
   }catch (error){
        return res.status(500).json(error);
   }
};

//Supprimer un catway donné
exports.deleteCatway = async (req, res)=>{
   const id=req.params.id;
   
   try {
        let deletedCatway = await Catway.findByIdAndDelete(id);

        if (!deletedCatway){
          return res.status(404).json('catway_not_found');
        } 
        return res.status(200).json('catway deleted');
   }catch (error){
        return res.status(500).json(error);
   }
};