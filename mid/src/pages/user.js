import React, {useEffect, useState} from "react";
import Guide from "../components/guide";
import axios from 'axios';
import {Table,Layout} from 'antd';
import './layout.css'
import logo from './logo.png'
import QueueAnim from 'rc-queue-anim';

export default function Users() {
    const [show] = useState(true)
    const { Header,Content,Sider }= Layout;
    const [data,setData] = useState([])
    const id = window.localStorage.id;
    const columns = [
        {
            title: 'Assignment',
            dataIndex: 'assignments',
            key: 'assignments',
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
        },
        {
            title: 'Stop',
            dataIndex: 'stop',
            key: 'stop',
        },
        {
            title: 'Grade',
            dataIndex: 'finish',
            key: 'finish',
        }
    ];
    useEffect(()=>{
        axios.get('/react/grades',{
            params:{
                sid:id
            }}).then((response)=>{
            setData(response.data)
        })
    })
    return<Layout >
        <Header className="header">
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
                            <Table columns={columns} key="demo1" dataSource={data} />
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}