// routes/
const { Router } = require("express");
const indexRouter = Router();
const { getAllTea, insertTea, getCountryOptions, getTeaTypeOptions, filterByCountry } = require("../db/queries");



// Our index router will take any requests from the index page and route them
indexRouter.get("/", async (req, res) => { // anonymous funtion, still needs to be marked async

  // grab our info from db first
  try{

    selectedCountry = req.query.country;
    let teaList;

    if (selectedCountry){
      teaList = await filterByCountry(selectedCountry);
    } else {
      teaList = await getAllTea();
    }

  
    const countryOptions = await getCountryOptions();
    // const typeOptions = await getTeaTypeOptions();
    res.render("index", { title: "Tea Inventory", teaList: teaList, countryOptions: countryOptions, selectedCountryId: selectedCountry });
  } 
  catch (err){
    res.status(500).send("Server error");
  }
  

 

});

/* 
Will route anytime we go to /new
*/
indexRouter.get("/new", async (req, res) => {

  try{

    const countryOptions = await getCountryOptions();
    const teaTypeOptions = await getTeaTypeOptions();
    res.render("newTea", { title: "Create New Tea", countryOptions: countryOptions, teaTypeOptions: teaTypeOptions });
    
  } catch(err){
    res.status(500).send("Server error");
  }


  
});

// deals with form submission - i.e. when we get a post request from new, we insert into db and redirect
indexRouter.post("/new", async (req, res) => {
  await insertTea(req.body); // the body holds info about the tea, accessed via - MUST USE 'await' KEYWORD!
  res.redirect("/");
});

module.exports = indexRouter;