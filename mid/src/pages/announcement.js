import React,{useState,useEffect} from "react";
import Guide from "../components/guide";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {Table, Space, Button, Layout, Tag,Card} from 'antd';
import logo from './logo.png';
import './layout.css';
import QueueAnim from "rc-queue-anim";

export default function Announcements() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const { Header,Content,Sider }= Layout;
    const [data,setData] = useState([])
    const history = useHistory();

    useEffect(()=>{
        const now = Date.now()
        console.log(now, timer)
        if (timer===0||now-timer>3000) {
            axios.defaults.withCredentials = true;
            axios.get('/api/user/selectQuestionsByAssignment', {
            }).then((response) => {
                setData(response.data)
                setTimer(now)
            })
        }
    })
    return<Layout>
        <Header className="header" >
            <img src={logo} style={{height:'45px'}} alt= "" />
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-content"><Guide/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'600px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['top', 'bottom']}
                        duration = "1400"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Card>announcement</Card>
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}