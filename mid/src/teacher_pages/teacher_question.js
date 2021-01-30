import React,{useState,useEffect} from "react";
import GuideTeacher from "../components/guide_teacher";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {Table, Space, Button, Layout} from 'antd';
import logo from '../pages/logo.png';
import '../pages/layout.css';
import QueueAnim from "rc-queue-anim";

export default function Questions() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const { Header,Content,Sider }= Layout;
    const [data,setData] = useState([])
    const history = useHistory();
    const columns = [
        {
            title: 'Index',
            dataIndex: 'question_index',
            key: 'index'
        },
        {
            title: 'Question_name',
            dataIndex: 'question_name',
            key: 'question_name',
            render: text => <a>{text}</a>
        },
        {
            title: 'Detail',
            key: 'detail',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        window.localStorage.question_ID = record.question_id;
                        history.push('/detail');
                    }}>details</Button>
                </Space>
            ),
        },
        {
            title: 'Update',
            key: 'update',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        window.localStorage.updateQuestionId = record.question_id;
                        history.push('/renewQuestion');
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
                      axios.get('api/admin/deleteQuestion',{params:{
                          question_id:record.question_id,
                          }})
                        history.push('/teacherQuestion');
                    }}>delete</Button>
                </Space>
            ),
        }
        ,
        {
            title: 'copycat',
            key: 'copycat',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        window.localStorage.question_id = record.question_id
                        history.push('/copycat');
                    }}>copycat</Button>
                </Space>
            ),
        }
    ];
    const assignment_id = window.localStorage.assignment_ID;
    useEffect(()=>{
        const now = Date.now()
        console.log(now, timer)
        if (timer===0||now-timer>3000) {
            axios.defaults.withCredentials = true;
            axios.get('/api/user/selectQuestionsByAssignment', {
                params: {
                    assignment_id: assignment_id
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
                            <Button  type="primary"  onClick={()=>{
                                window.localStorage.current = 'assignments';
                                history.push('/AddQuestion')
                            }}>Add query</Button>,
                            <Button  type="primary"  onClick={()=>{
                                window.localStorage.current = 'assignments';
                                history.push('/add_trigger')
                            }}>Add Trigger</Button>,
                            <div style={{height:'20px'}}/>,
                            <Table columns={columns} key="demo1" dataSource={data} />
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}