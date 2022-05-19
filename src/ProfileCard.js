import locationLogo from './src-images/location.jpg'



const ProfileCard = (props) => {

var profileName = props.profileName;
var country = props.country;
var profilePictureLink = props.profilePictureLink;
var skills = String(props.skills);
var payRate = props.payRate;
var rating = props.rating;
var description = props.description



    return (  
        <div className="profilecard">
            <h1>Profile view</h1>


<td>
<img id="profile-picture" src={profilePictureLink} alt={profileName +" img"} />

</td>

<td>

    <tr><h2>{profileName}</h2></tr>
    <tr>
        <td>
        <img src={locationLogo} alt="" height="40" />
        <p>{country}</p></td>
        </tr>
</td>


<h3>pay rate {payRate}</h3>
<h3>Rating {rating}</h3>

<h3>Description </h3> 
<p className='big-paragraphs'>{description}</p>

<h3>skills: {skills} </h3> 
<p></p>




        </div>
    );
}
 
export default ProfileCard;