import React,{useState,useEffect} from "react";
import GuideTeacher from "../components/guide_teacher";
import axios from 'axios';
import {Table, Layout} from 'antd';
import logo from '../pages/logo.png';
import '../pages/layout.css';
import QueueAnim from "rc-queue-anim";

export default function Copycat() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const { Header,Content,Sider }= Layout;
    const [data,setData] = useState([])
    const columns = [
        {
            title: 'sid_1',
            dataIndex: 'sid_1',
            key: 'sid_1'
        },
        {
            title: 'sid_2',
            dataIndex: 'sid_2',
            key: 'sid_2',
        },
        {
            title: 'checkResult',
            dataIndex: 'checkResult',
            key: 'checkResult',
            render: text => <a>{text}</a>
        },
    ];


    useEffect(()=>{
        const now = Date.now()
        console.log(now, timer)
        if (timer===0||now-timer>3000) {
            axios.defaults.withCredentials = true;
            axios.get('/api/admin/checkSimilarityByQid', {
                params: {
                    question_id: window.localStorage.question_id
                }
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
            <Sider width={200} className="site-layout-content"><GuideTeacher/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'600px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['top', 'bottom']}
                        duration = "1400"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Table columns={columns} key="demo1" dataSource={data} />,
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}