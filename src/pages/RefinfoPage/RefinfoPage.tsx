import { downloadJsonFile } from '../../utils/downloadExampleJson'
import './refinfoPage.css'

export function RefinfoPage() {
    return(
        <>
            <p className="refinfo-text">
                Our website is the strong tool that can help you estimate your software! Based on COCOMO method our web-app provides innovative and accurate result of estimation cost.
            </p>
            <div className='centralized-container'>
                <img src="/images/faqIcon.png" alt="Lightbulb icon"></img>
            </div>
            <p className="refinfo-text">
                <br />
                More about specification of COCOMO method you can learn <a href='https://cocomo.vercel.app/'>following reference</a>.
                <br /><br />
                More about estimation process in software development <a href='https://qarea.com/blog/a-short-guide-to-project-cost-estimation-in-software-development-outsourcing'>following reference</a>.
                <br /><br />
                
                Example of formating .json file to successful using import data functionality <a href="#" onClick={() => downloadJsonFile()}>following reference</a>. You must pay attention to some rules: don't need to touch null, every row must have exactly one '1' symbol (not 2 or more), every row has 6 values (from 1 to 6 according to from 'Very low' to 'Critical' rating mark). You can just take example file and update this in your own (instead of creating new).
                <br /><br /><br /><br /><br /><br /><br /><br />
            </p>
            <div className='centralized-container foot-container'>
                <p>{`© ${new Date().getFullYear()} Alex Hamaiun (Joe Gomez). All rights reserved.`}</p>
            </div>
        </>
    )
}