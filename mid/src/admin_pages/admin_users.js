import React,{useState} from "react";
import GuideAdmin from "../components/guide_admin";
import axios from 'axios';
import {Card,Button, Layout, message, Input, Select} from 'antd';
import logo from '../pages/logo.png';
import '../pages/layout.css';
import QueueAnim from "rc-queue-anim";

export default function Admin_users() {
    const success = () => {
        message.success('grant success');
    };
    const { Option } = Select;
    const [show] = useState(true)
    const { Header,Content,Sider }= Layout;
    const [operate_id,setOperate_id] = useState(1);
    const [se,setSe] = useState('TA')
    return<Layout>
        <Header className="header" >
            <img src={logo} style={{height:'45px'}} alt= "" />
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-content"><GuideAdmin/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'600px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['top', 'bottom']}
                        duration = "1400"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Card>
                                <Input style={{width:"200px"}} placeholder="operate id" onChange={value=>{
                                    setOperate_id(value.target.value)
                                }}/>
                                <div style={{height:"20px"}}/>
                                <Select key="demo5" defaultValue="target security"  onChange={(value)=>{
                                    setSe(value)
                                }}>
                                    <Option value="TA">TA</Option>
                                    <Option value="admin">admin</Option>
                                </Select>
                                <div style={{height:"20px"}}/>
                                <Button style={{width:"90px"}} type="primary"  onClick={()=>{
                                    axios.get('/api/admin/addUserToNewRole',{params:{
                                            sid:operate_id,
                                            role_code:se
                                        }})
                                    success()
                                }}>submit</Button>
                            </Card>
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}