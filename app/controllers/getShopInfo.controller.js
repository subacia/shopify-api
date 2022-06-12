const shopifyDetails = require("../config/shopify.config.js")
var request = require('request-promise');

exports.getShopInfo = (req,res) =>{

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
        
        res.status(200).json({
            shop_info : response
        });
    })
    .catch(function (err) {
        
        res.status(500).json({
            error : err
        });
    });
}

