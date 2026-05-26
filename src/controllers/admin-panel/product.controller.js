
const productModel = require("../../controllers/admin-panel/product.controller");

var slugify = require('slugify')

const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

exports.create = async(request,response) => {
     const saveData = request.body

    if(request.file){
      saveData.image = request.file.filename
    }

     if(request.body != undefined){
        if(request.body.name != undefined || request.body.name != ''){
            var slug = slugify(request.body.name, {
                lower : true,
                strict : true
            })

            saveData.slug = await generateUniqueSlug(productModel, slug);
        }
    }


    await productModel(saveData).save()
    .then((result) => {
        const data = {
        _status : true,
        _message : 'Record Found sucessfully !!',
        _data : result
      }
    response.send(data)
    })
    .catch((error) => {

      var errorMessages = {};

      for( var i in error.errors){
        errorMessages[i] = error.errors[i].message;
      }


        const data = {
        _status : false,
        _message : 'something went wrong !!',
        _error : errorMessages,
        _data : null
      }
    response.send(data)
    })
}

exports.view = async(request,response) => {
    
}

exports.details = async(request,response) => {
    
}

exports.changeStatus = async(request,response) => {
    
}

exports.update = async(request,response) => {
    
}

exports.destroy = async(request,response) => {
    
}