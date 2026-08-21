import {
    getInventoryByProductIdService,
    updateInventoryService
} from "../services/inventory.service.js";

const getInventoryByProductIdController = async (req,res,next)=>{
    const { id } = req.params;
    try{
         const inventory = await getInventoryByProductIdService(id);
         res.status(200).json(inventory);
    }catch (err) {
        next(err);
    }
}

const updateInventoryController = async(req,res,next)=>{
    const { id } = req.params;
    const { quantity } = req.body;
    try{
        const inventory = await updateInventoryService(id,quantity);
        res.status(200).json(inventory);
    }catch (err) {
        next(err);
    }
}

export {getInventoryByProductIdController,updateInventoryController};