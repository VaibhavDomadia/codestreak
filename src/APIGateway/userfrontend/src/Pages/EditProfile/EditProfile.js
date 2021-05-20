import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import EditIcon from '../../Icons/pen-solid.svg';
import InputError from '../../Components/InputError/InputError';
import axios from '../../util/interceptor';
import { useHistory } from 'react-router';
import DarkIconButton from '../../Components/DarkIconButton/DarkIconButton';

const EditProfile = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [organization, setOrganization] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const userID = props.match.params.userID;
    const history = useHistory();

    const onFirstNameChange = (event) => {
        setFirstNameError('');
        setFirstName(event.target.value);
    }
    
    const onLastNameChange = (event) => {
        setLastNameError('');
        setLastName(event.target.value);
    }

    const onCountryChange = (event) => {
        setCountry(event.target.value);
    }

    const onOrganizationChange = (event) => {
        setOrganization(event.target.value);
    }

    const onProfileImageChange = (event) => {
        setProfileImage(event.target.files[0]);
    }

    const onEdit = async () => {
        let isErrorPresent = false;
        if(firstName.trim() === '') {
            setFirstNameError('This Field is Required');
            isErrorPresent = true;
        }
        if(lastName.trim() === '') {
            setLastNameError('This Field is Required');
            isErrorPresent = true;
        }
        if(!isErrorPresent) {
            try {
                const formData = new FormData();
                formData.append('firstName', firstName);
                formData.append('lastName', lastName);                
                if(country.trim() !== '') {
                    formData.append('country', country.trim());
                }
                if(organization.trim() !== '') {
                    formData.append('organization', organization.trim());
                }
                if(profileImage !== null) {
                    formData.append('image', profileImage);
                }

                const response = await axios.put(`/api/user/${userID}`, formData);

                history.push(`/user/${userID}`);
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Profile'});
                }
                else if(error.response.status === 404) {
                    history.replace('/404');
                }
                else if(error.response.status === 403) {
                    history.replace('/403');
                }
                else if(error.response.status === 500) {
                    history.replace('/500');
                }
                else {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/user/${userID}`);

                const { firstName, lastName, country, organization } = response.data.user;

                setFirstName(firstName);
                setLastName(lastName);
                if(country) {
                    setCountry(country);
                }
                if(organization) {
                    setOrganization(organization);
                }
            }
            catch(error) {
                if(error.response.status === 401) {
                    history.push('/login', {from: 'Edit Profile'});
                }
                else if(error.response.status === 403) {
                    history.push('/403');
                }
                else if(error.response.status === 500) {
                    history.push('/500');
                }
                else {
                    history.push('/404');
                }
            }
        }

        fetchProfile();
    }, [userID]);

    return (
        <div className='EditProfile'>
            <div className='EditProfile-Header'>
                <div className='EditProfile-Header-Title'>
                    Edit Profile
                </div>
                <DarkIconButton icon={EditIcon} alt='Edit' title='Edit' onClick={onEdit}/>
            </div>
            {
                errorMessage &&
                <div className='EditProfile-Error'>
                    {errorMessage}
                </div>
            }
            <div className='EditProfile-Field-Container'>
                <div className='EditProfile-Field'>
                    <div className='EditProfile-Field-Title'>
                        First Name:
                    </div>
                    <InputError
                        inputType='text'
                        placeholder='Enter Your First Name'
                        error={firstNameError}
                        value={firstName}
                        onValueChange={onFirstNameChange}/>
                </div>
                <div className='EditProfile-Field'>
                    <div className='EditProfile-Field-Title'>
                        Last Name:
                    </div>
                    <InputError
                        inputType='text'
                        placeholder='Enter Your Last Name'
                        error={lastNameError}
                        value={lastName}
                        onValueChange={onLastNameChange}/>
                </div>
                <div className='EditProfile-Field'>
                    <div className='EditProfile-Field-Title'>
                        Country:
                    </div>
                    <InputError
                        inputType='text'
                        placeholder='Enter Your Country'
                        error=''
                        value={country}
                        onValueChange={onCountryChange}/>
                </div>
                <div className='EditProfile-Field'>
                    <div className='EditProfile-Field-Title'>
                        Organization:
                    </div>
                    <InputError
                        inputType='text'
                        placeholder='Enter Your Organization'
                        error=''
                        value={organization}
                        onValueChange={onOrganizationChange}/>
                </div>
                <div className='EditProfile-Field'>
                    <div className='EditProfile-Field-Title'>
                        Profile Picture:
                    </div>
                    <input type='file' name='image' onChange={onProfileImageChange} className='EditProfile-UploadImage'/>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;