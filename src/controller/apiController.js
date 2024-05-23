const { Filtering } = require("../services/FilterInDashboard")




const getDataFiltered = async (req, res) => {
    const data = await Filtering(req);
    try {
        return res.status(200).json({
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            data: "error"
        })
    }
}

module.exports = {getDataFiltered}