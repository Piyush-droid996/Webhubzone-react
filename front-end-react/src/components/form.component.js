import React, { useState } from 'react';
import axios from 'axios';



const Form = (props) => {

    /* LIST EMPLOYEES */
    const [contactList, setContactList] = useState([])

    /* SEARCH */
    const [searchParameterName, setSearchParameterName] = useState('');
    const URL = "http://localhost:5000/api/contactforms/";
    
    // useEffect(+++

    //         // const data= [{ Name:'Jitesh Kumar', Number:'12345677', Email:"jitesh@gmail.com", Company:'webhub', Services:"seo", Requirement:"optim", Other:"none"},
    //         //             { Name:'new', Number:'12345677', Email:"jitesh@gmail.com", Company:'webhub', Services:"seo", Requirement:"optim", Other:"none"}
    //         //         ];
    //         // setContactList(data);
                
    //     },
    //     [confirmUpdate]
    // );

    const handleInputChange = (event) => {
        setSearchParameterName(event.target.value.toString());
    }
    const searchItems = () => {
        axios.get(URL).then(response => {
            response.data.map((item)=> item.isEditing=false);
            response.data.map((item)=> item.isDeleting=false);
            setContactList(response.data);
        });
    }

    /* UPDATE */
    const handleContactInputeChange = (contact, prInput) => {
    ; //Create copy of contactList
        const index = contactsNewReference.findIndex((item) => item.id === contact.id);
        const { name, value } = prInput.target;
        contactsNewReference[index] = { ...contact, [name]: value };
        setContactList(contactsNewReference);
    }
    const updateEditingStatus = (contact, prFlag) => {
        let contactsNewReference = [...contactList]; //Create copy of contactList
        const index = contactsNewReference.findIndex((item) => item.id === contact.id);
        contactsNewReference[index].isEditing = prFlag;
        setContactList(contactsNewReference);
    }
    const confirmUpdate = (contact) => {
        axios.put(URL+contact.id, contact).then(response => {
            
            let contactsNewReference = [...contactList]; //Create copy of contactList
            const index = contactsNewReference.findIndex((item) => item.id === contact.id);
            contactsNewReference[index] = response.data;
            contactsNewReference[index].isEditing = false;
            setContactList(contactsNewReference);
            alert(response.data.message);
        });
        
    
    }

    /* INSERT */
    const [contactToSearch, setContactToSearch] = useState(contactList);
    const handleContactInputChange = (prInput) => {
        const { name, value } = prInput.target;
        let contactToSearchNewReference = { ...contactToSearch, [name]: value };
        setContactToSearch(contactToSearchNewReference);
    }
    const confirmNewContact = () => {
        axios.post(URL+"", contactToSearch).then(response => {
            let contactsNewReference = [ ...contactList ];
            contactsNewReference.push(response.data);
            setContactList(contactsNewReference);
            setContactToSearch({ name: '', address: '', telephone: '' });
        })
    }

    /* DELETE */
    const updateDeletingStatus= (contact, prFlag) => {
        let contactsNewReference = [...contactList]; //Create copy of contactList
        const index = contactsNewReference.findIndex((item) => item.id === contact.id);
        contactsNewReference[index].isDeleting = prFlag;
        setContactList(contactsNewReference);
    }
    const deleteContact = (contact) => {
        
        axios.delete(URL+contact.id).then(response => {
            alert(response.data.message);
            let contactsNewReference = [...contactList];
            const index = contactsNewReference.findIndex((item) => item.id === contact.id);
            contactsNewReference.splice(index, 1);
            setContactList(contactsNewReference);
        });
    }


    return (
        <div style={{marginTop:"10vh"}}>
            <hr />
            <h2>Contacts</h2>
            <br />
            <div className="row">
                {/* Search Contact */}
                <div className="col-md-4">
                    <div className="card border border-secondary shadow-0">
                        <div className="card-header bg-secondary text-white"><b>Search</b> Contact<span className="glyphicon glyphicon-search"></span></div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-7">
                                    <label className="form-label">Contact</label>
                                    <input className="form-control" placeholder="Enter" name="name" type="text" value={searchParameterName} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-5">
                                    <label className="form-label">&nbsp;</label>
                                    <div className="btn-toolbar">
                                        <button type="button" className="btn btn-primary form-control" onClick={searchItems.bind(this)}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* New Contact */}
                <div className="col-md-8">
                    <div className="card border border-secondary shadow-0">
                        <div className="card-header bg-secondary text-white"> Contact</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" placeholder="Enter Name" name="name" value={contactToSearch.name} onChange={handleContactInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Contact Number</label>
                                    <input className="form-control" placeholder="Enter Number" name="address" value={contactToSearch.address} onChange={handleContactInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Email Address</label>
                                    <input className="form-control" placeholder="Enter Email Address" name="email" value={contactToSearch.telephone} onChange={handleContactInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">&nbsp;</label>
                                    <button type="button" className="btn btn-success form-control" onClick={confirmNewContact.bind(this)} >Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* Display Contact */}
            <div className="card border border-secondary shadow-0" style={{ overflow:'show'}}>
                <div className="card-header bg-secondary text-white"><b>Display</b> Contacts</div>
               
                <div className="card-body" style={{"overflow-y":'scroll'}} >
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Services</th>
                                <th>Requirement</th>
                                <th>Other Info</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <br/>
                        <tbody >
                            {contactList.map(item =>
                                <tr key={1000-item.id}>
                                    <td><input className="form-control" value={item.contactName} onChange={handleContactInputeChange.bind(this, item)} name="contactName" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.contactNumber} onChange={handleContactInputeChange.bind(this, item)} name="contactNumber" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.contactEmail} onChange={handleContactInputeChange.bind(this, item)} name="contactEmail" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.companyName} onChange={handleContactInputeChange.bind(this, item)} name="companyName" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.services} onChange={handleContactInputeChange.bind(this, item)} name="services" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.requirements} onChange={handleContactInputeChange.bind(this, item)} name="requirements" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.otherInfo} onChange={handleContactInputeChange.bind(this, item)} name="otherInfo" disabled={!item.isEditing} /></td>
                                    <td>
                                        <div className="btn-toolbar" style={{"justify-content":"space-around"}}>
                                            <button type="button" className="btn btn-info mr-2" onClick={updateEditingStatus.bind(this, item, true)} style={{ display: item.isEditing ? 'none' : 'block' }}><i class="fa fa-edit"></i></button>
                                            <button type="button" className="btn btn-warning mr-2" onClick={updateEditingStatus.bind(this, item, false)} style={{ display: item.isEditing ? 'block' : 'none' }}><i class="fa fa-solid fa-ban"></i></button>
                                            <button type="button" className="btn btn-success mr-2" onClick={confirmUpdate.bind(this, item)} style={{ display: item.isEditing ? 'block' : 'none' }}><i class="fa fa-light  fa-check"></i></button>
                                            <button type="button" className="btn btn-warning mr-2" onClick={updateDeletingStatus.bind(this, item, false)} style={{ display: item.isDeleting ? 'block' : 'none' }}><i class="fa fa-solid fa-ban"></i></button>
                                            <button type="button" className="btn btn-success mr-2" onClick={deleteContact.bind(this, item)} style={{ display: item.isDeleting ? 'block' : 'none' }}><i class="fa fa-light  fa-check"></i></button>
                                            <button type="button" className="btn btn-danger mr-2" onClick={updateDeletingStatus.bind(this, item, true)} style={{ display: item.isDeleting ? 'none' : 'block' }}><i class="fa fa-solid fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Form;