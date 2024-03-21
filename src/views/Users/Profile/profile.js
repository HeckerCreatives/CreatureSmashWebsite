import React , { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import imege from "assets/01-Bronze/01-Goblin.png"
import Swal from "sweetalert2";

const Profile = () => {
    const [imahe, setImahe] = useState(null)
    const [mydetail, setMyDetail] = useState([])
  
  const handleChangeImage = (e) => {
    const image = e.target.files[0]
    setImahe(image);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/getuserdetails`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(result => result.json())
    .then(data => {
      if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
        Swal.fire({
          icon: "error",
          title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
          text: data.message == "duallogin" ? "Hi Creature, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Creature please contact admin" : "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.href = "/login";
          }
        })
      }

      if(data.message == "success"){
        setMyDetail(data.data)
      }  else {
        Swal.fire({
          title: data.message,
          icon: "info",
          text: data.data
        })
      }
    })
  },[])

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    const { firstname, lastname, address, city, country, postalcode, paymentmethod, accountnumber } = e.target
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update your profile details!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_API_URL}/user/updateuserprofile`,{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname: firstname.value != "" ? firstname.value : mydetail.firstname,
            lastname: lastname.value != "" ? lastname.value : mydetail.lastname,
            address: address.value != "" ? address.value : mydetail.address,
            city: city.value != "" ? city.value : mydetail.city,
            country: country.value != "" ? country.value : mydetail.country,
            postalcode: postalcode.value != "" ? postalcode.value : mydetail.postalcode,
            paymentmethod: paymentmethod.value != "" ? paymentmethod.value : mydetail.paymentmethod,
            accountnumber: accountnumber.value != "" ? accountnumber.value : mydetail.accountnumber
          })
        }).then(result => result.json())
        .then(data => {
          if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
            Swal.fire({
              icon: "error",
              title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
              text: data.message == "duallogin" ? "Hi Creature, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Creature please contact admin" : "You Will Redirect to Login",
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(ok => {
              if(ok.isConfirmed){
                window.location.replace("/login");
              }
            })
          }

          if(data.message == "success"){
            Swal.fire({
              title: data.message,
              icon: "success",
              text: "Updated Successfully"
            }).then(ok => {
              if(ok.isConfirmed){
                window.location.reload()
              }
            })
          }  else if (data.message == "failed"){
            Swal.fire({
              title: data.message,
              icon: "info",
              text: data.data
            })
          }
        })
      }
    });
    
  }

  const handleChangePhoto = (e) => {
    e.preventDefault();
    const imgdata = new FormData()

    imgdata.append("file", imahe)

    fetch(`${process.env.REACT_APP_API_URL}/user/uploadprofilepicture`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      },
      body: imgdata
    }).then(result => result.json())
    .then(data => {
      if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
        Swal.fire({
          icon: "error",
          title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
          text: data.message == "duallogin" ? "Hi Creature, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Creature please contact admin" : "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.replace("/login");
          }
        })
      }

      if(data.message == "success"){
        Swal.fire({
          title: data.message,
          icon: "success",
          text: "Creature Photo Updated Successfully"
        }).then(ok => {
          if(ok.isConfirmed){
            window.location.reload();
          }
        })
      }  else if (data.message == "failed"){
        Swal.fire({
          title: data.message,
          icon: "info",
          text: data.data
        })
      }
    })
  }
    return(
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleChangePhoto}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Creature Photo</label>
                        <div style={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            width: '100px',
                            height: '100px'
                          }}>
                            <img 
                              src={imahe != null ? URL.createObjectURL(imahe) : mydetail.profilepicture != "" ? `${process.env.REACT_APP_API_URL}/${mydetail.profilepicture}` : imege }
                              alt="pic" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                            />
                          </div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Choose Creature Photo</label>
                        <Input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          onChange={(e) => handleChangeImage(e)}
                          required
                        />
                      </FormGroup>
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Creature Photo
                      </Button>
                    </Col>
                  </Row>
                </Form>
                  <hr/>
                <Form onSubmit={handleUpdateDetails}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          placeholder={mydetail.username}
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input name="email" placeholder={mydetail.email} type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          name="firstname"
                          placeholder={mydetail.fistname}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          name="lastname"
                          placeholder={mydetail.lastname}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          name="address"
                          placeholder={mydetail.address}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          name="city"
                          placeholder={mydetail.city}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          name="country"
                          placeholder={mydetail.country}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input name="postalcode" placeholder={mydetail.postalcode} type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Payment Method</label>
                        <Input
                          name="paymentmethod"
                          placeholder={mydetail.paymentmethod}
                          type="text"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Account Number</label>
                        <Input
                          name="accountnumber"
                          placeholder={mydetail.accountnumber}
                          type="text"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile Details
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
    )
}

export default Profile;