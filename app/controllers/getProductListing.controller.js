const shopifyDetails = require("../config/shopify.config.js")
var request = require('request-promise');

exports.getProductListing = (req,res) =>{

    var page_info = req.query.page_info;
    var limit = req.query.limit;
    var rel = req.query.rel;

    var shopInfo = getShopData().then((shopInfoResponse) => {

        var productCount = getProductCountData().then((productCountResponse) => {

            var productData = getProductData(page_info,limit,rel ).then((productResponse) => {

                shopInfo =  {
                    name : shopInfoResponse.shop.name,
                    domain : shopInfoResponse.shop.domain
                }

                var productsArr = [];

                productResponse.forEach(product => {

                    var variantsArr = [];

                    variantsResponse = product.variants;

                    variantsResponse.forEach(variant => {
                        var variantData = {
                            id : variant.id,
                            title : variant.title,
                            price : variant.price ,
                            compare_at_price : variant.compare_at_price ,
                            inventory_item_id : variant.inventory_item_id ,
                            inventory_quantity : variant.inventory_quantity ,
                            requires_shipping : variant.requires_shipping 
                        }
                        variantsArr.push(variantData);
                    });

                    var imagesArr = [];

                    imagesResponse = product.images;

                    imagesResponse.forEach(images => {
                        var imagesData = {
                            src : images.src
                        }
                        imagesArr.push(imagesData);
                    });

                    var eachProduct = {
                        id : product.id,
                        title : product.title,
                        created_at : product.created_at,
                        status : product.status,
                        variants : variantsArr,
                        images : imagesArr
                    }
                
                    productsArr.push(eachProduct);
                });


                var productListing = {
                    shop_info : shopInfo,
                    product_count : productCountResponse.count,
                    products : productsArr
                }

                res.status(200).json({
                    productListing : productListing
                });

            }).catch((error) => {

                res.status(500).json({
                    error : error
                });
            });


           
        }).catch((error) => {
            res.status(500).json({
                error : error
            });
        });
        
        
    }).catch((error) => {
        res.status(500).json({
            error : error
        });
    });

    
}

const getShopData = () =>{

    return new Promise((resolve, reject) =>{
        
        let url = shopifyDetails.REQUEST_URL + "shop.json";

        let options = {
            method: 'GET',
            uri: url,
            json: true,
            headers: {
                'X-Shopify-Access-Token': shopifyDetails.SHOPIFY_ACCESS_TOKEN,
                'content-type': 'application/json'
            }
        };

        request(options)
        .then(function (response) {

            resolve(response)
        })
        .catch(function (err) {
            
            reject(err)
        });
    }).catch((error) =>{
        throw new Error(error);
    });
}


const getProductCountData = () =>{

    return new Promise((resolve, reject) =>{
        
        let url = shopifyDetails.REQUEST_URL + "products/count.json";

        let options = {
            method: 'GET',
            uri: url,
            json: true,
            headers: {
                'X-Shopify-Access-Token': shopifyDetails.SHOPIFY_ACCESS_TOKEN,
                'content-type': 'application/json'
            }
        };

        request(options)
        .then(function (response) {

            resolve(response)
        })
        .catch(function (err) {
            
            reject(err)
        });
    }).catch((error) =>{
        throw new Error(error);
    });
}


const getProductData = (page_info,limit,rel) =>{

    return new Promise((resolve, reject) =>{
        
        let url = shopifyDetails.REQUEST_URL + "products.json?limit=" + limit + "&page_info=" + page_info + "&rel=" + rel;

        let options = {
            method: 'GET',
            uri: url,
            json: true,
            headers: {
                'X-Shopify-Access-Token': shopifyDetails.SHOPIFY_ACCESS_TOKEN,
                'content-type': 'application/json'
            }
        };

        request(options)
        .then(function (response) {

            var products = response.products;
            // var limit = 10;
            // var startIndex = (page-1)*limit;
            // var endIndex   =  page*limit;
            
            // var responseData = products.slice(startIndex, endIndex);

            resolve(products)
        })
        .catch(function (err) {
            
            reject(err)
        });
    }).catch((error) =>{
        throw new Error(error);
    });
}