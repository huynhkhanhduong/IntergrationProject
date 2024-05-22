const connection = require("../config/database");
const { Filtering } = require("../services/FilterInDashboard");
const { GetDeparments } = require("../services/GetDeparments");
// const {
//     getAllUsers,
//     handleCreateUser,
//     getEditUser,
//     getDeleteUser,
//     handleUpdateUser,
// // } = require("../services/CRUDServices");

// const getCreatePage = (req, res) => {
//     res.render("create.ejs");
// };

// const getHomePage = async (req, res) => {
//     try {
//         let results = await getAllUsers();
//         if (results.length === 0) {
//             return res.redirect("/error500");
//         }
//         return res.render("home.ejs", { listUsers: results });
//     } catch (error) {
//         console.error("Error fetching list of users:", error);
//         return res.status(500).render("error500.ejs");
//     }
// };

// const getPro = (req, res) => {
//     res.render("sample.ejs");
// };

// const postCreateUser = async (req, res) => {
//     try {
//         const { email, name, address } = req.body;
//         handleCreateUser({ email, name, address });
//         return res.redirect("/home");
//     } catch (error) {
//         console.error("Error creating user:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// };

// const deleteUser = async (req, res) => {
//     let id = req.params.id;
//     getDeleteUser(id);
//     res.redirect("/home");
// };

// const setEditUserToForm = async (req, res, next) => {
//     let id = req.params.id;
//     let [results, fields] = await getEditUser(id);
//     const { name, email, City: address } = results[0];
//     res.render("edit.ejs", { id, name, email, address });
// };

// const postUpdateUser = async (req, res) => {
//     const { email, name, address, id } = req.body;
//     try {
//         await handleUpdateUser({ email, name, address, id });
//         return res.redirect("/home");
//     } catch (error) {
//         console.error("Error updating user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };

const RenderDashboardPage = async (req, res) => {
    try {
        const { department,date,shareholder,gender,type_of_work,ethnicity}=req.body;
        const data = await GetDeparments();
        const filter= Filtering(department,date,shareholder,gender,type_of_work,ethnicity);
        console.log(data)
        return res.render("Dashboard.ejs", {
            departments: data
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};
const RenderTotalEarningPage = async (req, res) => {
    try {
        return res.render("TotalEarning.ejs");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};
const RenderVacationDaysPage = async (req, res) => {
    try {
        return res.render("VacationDays.ejs");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};
const RenderAverageBenefitsPage = async (req, res) => {
    try {
        return res.render("AverageBenefits.ejs");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    // getHomePage,
    // getPro,
    // postCreateUser,
    // getCreatePage,
    // deleteUser,
    // setEditUserToForm,
    // postUpdateUser,
    RenderVacationDaysPage,
    RenderAverageBenefitsPage,
    RenderDashboardPage,
    RenderTotalEarningPage
};
