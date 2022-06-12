const shopifyDetails = require("../config/shopify.config.js")
var request = require('request-promise');

exports.getAllVariants = (req,res) =>{

    var fields = req.query.fields;
    var productId = req.query.productId;

    let url = shopifyDetails.REQUEST_URL + "products/" + productId + "/variants.json?fields=" + fields;

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
        
        res.status(200).json({
            data : response
        });
    })
    .catch(function (err) {
        
        res.status(500).json({
            error : err
        });
    });
}