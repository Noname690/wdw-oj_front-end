import React,{useState,useEffect} from "react";
import GuideTeacher from "../components/guide_teacher";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {Table, Space, Button,Layout} from 'antd';
import logo from '../pages/logo.png';
import QueueAnim from 'rc-queue-anim';
import '../pages/layout.css';

export default function Teacher_assignment() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const { Header,Content,Sider }= Layout;
    const [data,setData] = useState([])
    const history = useHistory();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'assignment_name',
            key: 'name'
        },
        {
            title: 'Start',
            dataIndex: 'assignment_start_time',
            key: 'start',
        },
        {
            title: 'deadline',
            dataIndex: 'assignment_end_time',
            key: 'deadline',
        },
        {
            title: 'detail',
            key: 'detail',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        window.localStorage.assignment_ID = record.assignment_id;
                        history.push('/teacherQuestion');
                    }}>details</Button>
                </Space>
            ),
        },
        {
            title: 'update',
            key: 'update',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        window.localStorage.assignment_ID = record.assignment_id;
                        history.push('/updateAssignment');
                    }}>update</Button>
                </Space>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        axios.get('/api/admin/deleteAssignment', {
                            params: {
                                assignment_id:record.assignment_id,
                            }
                        })
                        history.push('/teacher_assignment')
                    }}>delete</Button>
                </Space>
            ),
        }
    ];
    useEffect(()=>{
        const now = Date.now()
        if (timer===0||now-timer>3000) {
        axios.get('/api/user/queryAssigmentList').then((response)=>{
            const temp = response.data
            for (var i=0;i<temp.length;i++){
                var newTime = new Date(temp[i].assignment_start_time);
                temp[i].assignment_start_time = newTime.getFullYear()+'/'+newTime.getMonth()+'/'+newTime.getDate()+' '+newTime.getHours()+':'+newTime.getMinutes()
                newTime = new Date(temp[i].assignment_end_time);
                temp[i].assignment_end_time = newTime.getFullYear()+'/'+newTime.getMonth()+'/'+newTime.getDate()+' '+newTime.getHours()+':'+newTime.getMinutes()
            }
            setData(temp)
            setTimer(now)
        })
    }
    })
    return<Layout>
        <Header className="header">
            <img src={logo} style={{height: '45px'}} alt= "" />
        </Header>
        <Layout >
            <Sider style={{width:'200px'}} className="site-layout-content"><GuideTeacher/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'600px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['top', 'bottom']}
                        duration = "1400"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Button type="primary"  onClick={()=>{
                                window.localStorage.current = 'assignments';
                                history.push('/AddAssignment')
                            }}>Add assignments</Button>,
                            <div style={{height:'20px'}}/>,
                            <Table columns={columns} key="demo1" dataSource={data} />
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}

