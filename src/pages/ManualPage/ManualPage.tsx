import { Link } from "react-router-dom"
import "./manualPage.css"

export function ManualPage() {
    return(
        <>
            <p className="manual-text">
                Welcome to MukgerCCM web-app! This user manual will guide you through the various features and functionalities of our website to help you make the best experience.
                <br /><br />
                You can use our navigation features just in the left menu column-case. <Link to="/home">Home page</Link> includes main tools for successful calculating costs (more about filling necessary fields in paragraph below). <Link to="/history">History page</Link> provides you with a history of your calculations. On <Link to="/refinfo">refinfo page</Link> you can read more about us.
                <br /><br />
                To using our app in the right way you need to pick one of three options which is your projet nigh about, then approximately estimate size of your code in thousands line, after that specify some additional parameters in four different areas which can partially influence your results. Also you can use import feature to load some data-file into our web-app (more about while using import). After filling all the data you can press button in the right bottom angle and go to result page in which you can see results and export them in .pdf format.
            </p>
        </>
    )
}