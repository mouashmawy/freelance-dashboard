import Cookies from "universal-cookie";
import ClientNavbar from "./ClientNavbar";
import FreelancerNavbar from "./FreelancerNavbar";
import FreelancerContractPage from "./FreelancerContractPage";
import ClientContractPage from "./ClientContractPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./axios.js";
import ContractCard from "./ContractCard";
import Milestone from "./Milestone";


const ContractPage = ()=>{
    const contract_id = useParams().contract_id;
    const cookies = new Cookies();
    const accountType = cookies.getAll().type;
    const profile_id = cookies.getAll().active_id;
    const [contractData, setContractData] = useState({});
    const [milestones, setMilestones] = useState([]);
    const [milesontesNum, setMilestonesNum] = useState(0);


    const agreeOnContract = ()=>{
        axios.post(`/contract/${contract_id}/updatestatus`,{"input":"Accept"},{withCredentials:true}).then((res)=>{
            console.log(res);
        });
    }

    const endContract = ()=>{
        axios.post(`/contract/${contract_id}/end`,{withCredentials:true}).then((res)=>{
            console.log(res);
        });
    }

    useEffect(()=>{
        axios.get(`contract/${contract_id}`,{withCredentials:true}).then((res)=>{
            setContractData(res.data.message);
            setMilestones(res.data.message.milestones);
            setMilestonesNum(res.data.message.milestones.length)
            console.log(res);
    });
    },[]);

    const addMileStone = ()=>{
        var newList = milestones;
        newList.push({"milestone_id":'',"description":'',"date":0,"amount":'',"proposal_id":contract_id});
        setMilestones(newList);
        setMilestonesNum(milestones.length);
    }

    return(
        <div>
            {(accountType==='F') && <FreelancerNavbar profile_id={profile_id}/>}
            {(accountType==='C') && <ClientNavbar profile_id={profile_id}/>}
            <div className="clientcontractpage">
                {contractData.contract && <ContractCard contract={contractData.contract}/>}
                <div className="clientcontractmilestones">
                    <p><b>Miltstones</b>({milesontesNum})</p>
                    { (contractData.milestones) && milestones.map((milestone)=>(
                        <Milestone milestone={milestone} key={milesontesNum+1} contract_status={contractData.contract.status} status={contractData.permissions.special_status}/>
                    ))

                                        
                    }
                    { (contractData.permissions) && (contractData.permissions.special_status==="NAN") &&
                    <button onClick={addMileStone}><u><b>+Add Miltstones</b></u></button>
                    }
                </div>
                
                {(accountType==='C') && (contractData.permissions) && (contractData.permissions.client.accept) &&
                        <button onClick={agreeOnContract}>Submit</button>
                }
                {(accountType==='F') && (contractData.permissions) && (contractData.permissions.freelancer.accept) &&
                    <button onClick={agreeOnContract}>Agree On Contract</button>
                }

                { (contractData.contract) && (contractData.contract.status==="Active") &&
                    <button onClick={endContract}>End</button>
                }
            </div>

        </div>
    );
}


export default ContractPage;