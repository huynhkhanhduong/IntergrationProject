const express = require('express');
const { RenderHomePage, RenderAverageBenefitsPage, RenderTotalEarningPage, RenderDashboardPage, RenderVacationDaysPage} = require('../controller/homeController');
const { render } = require('ejs');
const router = express.Router();


// router.get('/home', getHomePage);
// router.get('/init', getPro)

// router.get('/create', getCreatePage);

// router.post('/create-user', postCreateUser);

// router.get('/delete/(:id)', deleteUser);

// router.get('/edit/(:id)', setEditUserToForm);

// router.post('/update', postUpdateUser);
router.get('/Dashboard', RenderDashboardPage);
router.get('/AverageBenefits', RenderAverageBenefitsPage);
router.get('/TotalEarning', RenderTotalEarningPage);
router.get('/VacationDays', RenderVacationDaysPage);

module.exports = router;

  