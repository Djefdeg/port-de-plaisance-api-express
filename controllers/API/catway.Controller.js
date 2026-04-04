const Catway = require ('../../models/catway.model');

//Afficher la liste des catway
exports.getAllCatways = async (req, res)=>{
   try {
        const catways = await Catway.find();
        return res.status(200).json(catways);
   }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
   }
};

//Afficher un catway déterminé
exports.getGivenCatway = async (req, res)=>{
   const catwayNumber=Number(req.params.catwayNumber);
   try {
        const catway = await Catway.findOne({catwayNumber:catwayNumber});
        if (!catway) {
            return res.status(404).json({message:'catway_not_found'});
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
        if (!req.body.catwayNumber || !req.body.catwayType || !req.body.catwayState) {
          return res.status(400).json({ message: 'Missing required fields' });
          }           
        let newCatway = await Catway.create(catwayBuffer);
          return res.status(201).json(newCatway);
   }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
   }
};

//Modifier les champs d'un catway donné
exports.updateGivenCatway = async (req, res)=>{
   const catwayNumber=Number(req.params.catwayNumber);
   
   try {
          if (!req.body.catwayState) {
           return res.status(400).json({ message: 'catwayState is required' });
          }
        const modifiedCatway = await Catway.findOneAndUpdate(
          {catwayNumber:catwayNumber},
          { catwayState: req.body.catwayState },
          {new:true, runValidators: true}
        );
        if (!modifiedCatway){
          return res.status(404).json({message:'catway_not_found'});
        } 
        return res.status(200).json(modifiedCatway);
   }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
   }
};

//Supprimer un catway donné
exports.deleteGivenCatway = async (req, res)=>{
   const catwayNumber=Number(req.params.catwayNumber);
   
   try {
        let deletedCatway = await Catway.findOneAndDelete({catwayNumber:catwayNumber});

        if (!deletedCatway){
          return res.status(404).json({message:'catway_not_found'});
        } 
        return res.status(200).json({ message: 'catway_deleted' });
   }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
   }
};