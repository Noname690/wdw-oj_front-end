import React,{useState} from "react";
import {useHistory} from "react-router-dom";
import GuideTeacher from "../components/guide_teacher";
import logo from '../pages/logo.png';
import '../pages/layout.css';
import {Layout, Card, Input, Button, Upload, Badge} from "antd";
import axios from "axios";
import { UploadOutlined } from '@ant-design/icons';
import QueueAnim from "rc-queue-anim";
import 'github-markdown-css'



export default function AddDatabase() {
    const { TextArea } = Input;
    const [show] = useState(true)
    const [DatabaseName,setDatabaseName] = useState('')
    const [description,setDescription] = useState('')
    const [file,setFile] = useState('')
    const { Header,Content,Sider }= Layout;
    const history = useHistory();

    const props = {
        action: '/api/admin/files/uploadToRemoteDatabase',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
                setFile(file.response.data);
            }
        },
        defaultFileList: [],}

    return<Layout>
        <Header  className="header">
            <img src={logo} style={{height:'45px'}} alt= "" />
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-content"><GuideTeacher/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'700px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['right', 'left']}
                        duration = "2000"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Card key="demo1" title="add Database"  >
                                <div><Badge status="processing" text="database name" /></div>
                                <Input style={{width:"200px"}} placeholder="Database Name" onChange={value=>{
                                    setDatabaseName(value.target.value)
                                }}/>
                                <div style={{height:"20px"}}/>
                                <TextArea className="submit_text" key="demo4" rows={5} placeholder="Input topic description" onChange={value=>{
                                    setDescription(value.target.value)
                                }}/>
                                <div style={{height:"20px"}}/>
                                <div><Badge status="processing" text="Upload the SQL file to generate the database" /></div>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                <div style={{height:"20px"}}/>
                                <Button style={{width:"90px"}} type="primary"  onClick={()=>{
                                    const params = new URLSearchParams();
                                    params.append('database_name',DatabaseName)
                                    params.append('database_description',description)
                                    params.append('file_id',file)
                                    axios.post('api/admin/files/createDatabase',params)
                                    window.localStorage.current = 'database';
                                    history.push('/Database')
                                }}>submit</Button>
                            </Card>
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}
