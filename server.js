var cheerio = require("cheerio");
var request = require("request");

console.log("\n******************************************\n" + "sourcewell-mn.gov" + "\n******************************************\n");

request("https://www.sourcewell-mn.gov/cooperative-purchasing/022217-wex", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("div.vendor-contract-header__content").each(function(i, element) {

    const title = $(element).children(".lead").text();

    const expiration = $(element).find("p").text()

    const spliceExpiration = expiration.slice(63,71)

    const contractInfo = expiration.slice(23,33)

    const otherName = expiration.slice(30,33)

    const contact = $("div.inline-user").find("strong").text()

    const contactName = contact.slice(0,15);

    const phones =  $("div.field--item").text()

    const phoneNumber = phones.slice(530,542)
    
    const phone3 = phones.slice(543,569)

    results.push({
      title: title,
      expiration: spliceExpiration,
      contract_number: contractInfo,
      vendor: {
        name: otherName,
        contacts: {
        name: contactName,
        phone: phoneNumber,
        email: phone3
        }
      }
    });
  });

  console.log(results[0]);
});

