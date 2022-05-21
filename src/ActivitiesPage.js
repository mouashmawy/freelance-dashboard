import {useState, useEffect } from "react";
import Cookies from "universal-cookie";
import FreelancerNavbar from "./FreelancerNavbar";
import ClientNavbar from "./ClientNavbar";
import axios from "./axios.js"
import JobCard from "./JobCard";




const ActivitiesPage = ()=>{

    const [prevContent, setPrevContent] = useState('');
    const [content, setContent] = useState();
    const [buttonsClasses,setButtonClasses] = useState({'appliedproposals':'activebutton','joboffers':'','activecontracts':'','finishedcontracts':'','jobsposted':''}) 
    const [accountType, setAccountType] = useState();
    const cookies = new Cookies();
    const [render,setRender] = useState('waiting');
    const [active_id,setActiveId] = useState('');
    const [ButtonState,setButtonState] = useState('');

    useEffect(()=>{
        if(accountType !== 'F' || accountType !=='C'){
            setAccountType(cookies.getAll().type);
            setActiveId(cookies.getAll().active_id);
            
        }
    },[accountType]);

    

    async function setMyContent(mycontent){
        setContent(mycontent);
    }

     async function handleBtnClick(btnState){
        //setting button color to the appropriate theme
        var newState = {'jobsposted':'','appliedproposals':'','joboffers':'','activecontracts':'','finishedcontracts':''};
        newState[btnState] = 'activebutton';
        setButtonClasses(newState);
        setButtonState(btnState);
        setContent();
        //handling requests to be done based on the button clicked
        
    } 

    useEffect(()=>{
        if(!content){
            setPrevContent(content);

        switch(ButtonState){
            case 'activecontracts':
                axios.get(`contract/contract/${active_id}/active`,{ withCredentials: true}).then((res)=>{
                    console.log(res);
                });
                break;
            case 'finishedcontracts':
                axios.get(`contract/contract/${active_id}/archived`,{ withCredentials: true}).then((res)=>{
                    setContent(<h1>content</h1>)
                });
                break;
            case 'jobsposted':
                axios.get(`job/get/active`,{ withCredentials: true}).then((res)=>{
                    if(res.data.success===1){
                        console.log(res.data.message)    
                        setMyContent(res.data.message.map((job)=>(<JobCard key={job.job_id} job={job}/>)));

                    }
                });
                break;
    }}},[ButtonState,content])
    

    return(
        <div>
            {(accountType==='F') && <FreelancerNavbar/>}
            {(accountType==='C') && <ClientNavbar/>}
            <div className="activitiespage">
                <div className="activitiesNavbar">
                    {(accountType==='F') && <button id={buttonsClasses['appliedproposals']} onClick={()=>{handleBtnClick('appliedproposals');}}>Applied proposals</button>}
                    {(accountType==='F') && <button id={buttonsClasses['joboffers']} onClick={()=>{handleBtnClick('joboffers');}}>Job offers</button>}
                    {(accountType==='C') && <button id={buttonsClasses['jobsposted']} onClick={()=>{handleBtnClick('jobsposted');}}>Jobs Posted</button>}
                    <button id={buttonsClasses['activecontracts']} onClick={()=>{handleBtnClick('activecontracts');}}>Active Contracts</button>
                    <button id={buttonsClasses['finishedcontracts']} onClick={()=>{handleBtnClick('finishedcontracts');}}>Finished Contracts</button>
                </div>
                <div className='activities-page-content'>
                    {(content) && content}
                </div>
            </div>
        </div>
    );
    


}
export default ActivitiesPage;