exports.createServices=async (data,collection)=>{
    return await collection.create(data)
}

exports.isMatch=async(collection,nameObject)=>{
    console.log(nameObject)
   return await collection.aggregate([
    {$match:nameObject}
   ])
}