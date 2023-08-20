const user_schema = require("./../models/users")
const faq_schema = require("./../models/faq")
const policy_schema = require("./../models/policies")
const press_release_schema = require("./../models/press_release")
const investor_relation_schema = require("./../models/investor_relation")

exports.val_register = async (req, res, next) => {
    const user = await user_schema.findOne({ email: req.body.email })

    if (user) return res.status(400).json({ msesage: "User already exist", status: "error" });
    const { name, email, password } = req.body;


    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields", status: "error" })
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message, message: "something went wrong" });
    }
}

exports.val_login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || email === null || !password) {
            return res.status(400).json({ message: "Please enter all fields", status: "error" });
        }
        next()
    } catch (error) {
        res.status(500).json({ error: error.message, message: "something went wrong" });

    }
}

exports.val_faq = async (req, res, next) => {
    const find_heading = await faq_schema.findOne({ heading: req.body.heading })

    if (find_heading) return res.status(400).json({ message: "This heading already exist.", status: "error" })

    const { content, heading, type } = req.body;
    try {
        if (content === "" || content === null || content === undefined || !content ||
            heading === "" || heading === null || heading === undefined || !heading ||
            type === "" || type === null || type === undefined || !type
        ) {
            return res.status(400).json({ message: "Please enter all fields." })
        }
        next()
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong, try again later." })

    }

}

exports.val_policies = async (req, res, next) => {
    const find_heading = await policy_schema.findOne({ policy_name: req.body.policy_name })

    if (find_heading) return res.status(400).json({ message: "This Policy already exist.", status: "error" })

    const { content, policy_name, type } = req.body;
    try {
        if (content === "" || content === null || content === undefined || !content ||
            policy_name === "" || policy_name === null || policy_name === undefined || !policy_name ||
            type === "" || type === null || type === undefined || !type
        ) {
            return res.status(400).json({ message: "Please enter all fields." })
        }
        next()
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong, try again later." })

    }
}

exports.contact_val = async (req, res, next) => {
    try {


        const { anonymous, business_name, service_name, our_presence, choose_within, message, authorize } = req.body;

        if (business_name === "" || business_name === null || business_name === undefined || !business_name) {
            return res.status(400).json({ message: "Please select Businesss Name. " })
        }
        if (service_name === "" || service_name === null || service_name === undefined || !service_name) {
            return res.status(400).json({ message: "Please select Service Name. " })
        }
        if (our_presence === "" || our_presence === null || our_presence === undefined || !our_presence) {
            return res.status(400).json({ message: "Please select country. " })
        }
        if (choose_within === "" || choose_within === null || choose_within === undefined || !choose_within) {
            return res.status(400).json({ message: "Please Choose your respective field. " })
        }
        if (message.length < 15) {
            return res.status(400).json({ message: "Message must contain atleast 15 characters" })
        }
        if (anonymous === false && authorize !== true) {

            return res.status(400).json({ message: "Please authorize us to look into this and get in touch with you." })

        }
        next()
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong, please try again later." })

    }

}

exports.val_newsletter = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (email === "" || email === null || email === undefined || !email) {
            return res.status(400).json({ message: "Please enter your email. " })
        }
        next()
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong, please try again later." })

    }


}
exports.val_press_release = async (req, res, next) => {
    const title_exist = await press_release_schema.findOne({ title: req.body.title })

    if (title_exist) return res.status(200).json({ message: "Title already exist.", status: "error" })

    const {title, period, category } = req.body;
    try {
        if (!title || !period || !category ) {
            return res.status(400).json({ message: "Please enter all fields", status: "error" })
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message, message: "something went wrong" });

    }
}

exports.val_investor_relation = async(req,res,next) =>{
    const title_exist = await investor_relation_schema.findOne({ inv_title: req.body.inv_title })

    if (title_exist) return res.status(200).json({ message: "Title already exist.", status: "error" })

    const {inv_title, inv_period, inv_category } = req.body;
    try {
        if (!inv_title || !inv_period || !inv_category ) {
            return res.status(400).json({ message: "Please enter all fields", status: "error" })
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message, message: "something went wrong" });

    }
}