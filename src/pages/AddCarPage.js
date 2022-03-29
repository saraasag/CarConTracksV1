import React from 'react';
import {Form, Select, Cascader, Input, Space, Button, message, InputNumber} from 'antd';
import moment from 'moment';
import Car from '../Components'
import {UploadOutlined} from '@ant-design/icons'
import { Redirect } from 'react-router';
const {Option} = Select;
import { useEthConnection } from '../EthConnection';


var imgUrlBase64 = [];

const layout = {
    labelCol: { span: 5},
    wrapperCol: { span: 10 },
    labelAlign: "left"
};

const imgChange = e => {
    var fileList = e.target.files;
    var file_num = fileList.length + 1;
    var AllowImgFileSize = 10240;
    for(let i = 0; i < fileList.length;i++){
        let reader = new FileReader();
        reader.readAsDataURL(fileList[i]);
        reader.onload = function(e){
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                message.error("file size exceeds 10kB!");
                return;
            }else{
                console.log(reader.result)
                imgUrlBase64.push(reader.result);
            }
            return;
        }
    }
    console.log(imgUrlBase64);
}

class AddCarPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myCar : new Car(null, null),
            posted: false
        }
    }
   const classes = useStyles();
  const auth = useAuth();
  let ethConnection = useEthConnection();
  let address = auth.user.userAddress;
  // console.log(address);
  // console.log(props);

  let [carRental, setCarRental] = useState(null);
  
  let [state, setState] = useState({
    customerName: '',
    customerAge: '',
    licenseID: '',
    shouldLeave: false,
    validity: false,
    confimation: false,
  });

  const [users, setUsers] = useState(null);

  useEffect(() => {
    setUsers(ethConnection.getAllUsers());
  }, [ethConnection.ethData]);

  useEffect(() => {
    setCarRental(ethConnection.carRental);
  }, [ethConnection.carRental]);

    async post(){
        var carOwner = document.getElementById("carOwner").value;
        var location = document.getElementById("location").value;
        var transImage;
        if (imgUrlBase64.length == 0) {
            transImage = "";
        } else {
            transImage = imgUrlBase64[0];
        }
        console.log(date)
        let call = await carRental.methods.addCar(longitude, latitude, date, price, transImage, title, description, physicalAddress);
        if(call[0]){
            message.success(call[1]);
            this.setState({
                posted: true
            })
        }
        else{
            message.error(call[1]);
        }
    }

    render(){
        this.state.myAgent.initialize();
        var lat = localStorage.getItem("lat");
        var lng = localStorage.getItem("lng");
        return(
            <Form {...layout} onFinish = {()=> this.post()}>
                {this.state.posted ? <Redirect to='/main'/> : ""}
                <h1>Post Car Information</h1>
                <Form.Item label = "Car Owner Name" rules={[{ required: true, message: 'Please enter a title!' }]} >
                    <Input id = "name" placeholder = "Enter car owner name" ></Input>
                </Form.Item>
                <Form.Item label = "What is your current location?" rules={[{ required: true, message: 'Please input your location!' }]} >
                    <Input id = "location" placeholder = "Enter car location" ></Input>
                </Form.Item>
                <Form.Item label = "Upload picture">
                    <Input type="file" id="test" name="filename" multiple = 'multiple' onChange = {imgChange}></Input>
                </Form.Item>
                <Form.Item>
                    <Button type = "primary" htmlType = 'submit' >Post</Button>
                    <p></p>
                    <Button type = "primary" htmlType = 'submit' href="/main">Return to Main Page</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default PostInfoPage