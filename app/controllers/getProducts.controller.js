const shopifyDetails = require("../config/shopify.config.js")
var request = require('request-promise');


exports.getProducts = (req,res) =>{

    var page_info = req.query.page_info;
    var limit = req.query.limit;
    var rel = req.query.rel;

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

        res.status(200).json({
            products : products
        });
    })
    .catch(function (err) {
        
        res.status(500).json({
            error : err
        });
    });
}