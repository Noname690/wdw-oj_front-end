import React,{useState,useEffect} from "react";
import GuideTeacher from "../components/guide_teacher";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {Table, Space, Button,Layout, Radio,message} from 'antd';
import logo from '../pages/logo.png';
import QueueAnim from 'rc-queue-anim';
import '../pages/layout.css';

export default function Databases() {
    const success_init = () => {
        message.success('init successfully');
    };
    const success_delete = () => {
        message.success('delete successfully');
    };
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const [operation_type,setOperation_type] = useState('query')
    const { Header,Content,Sider }= Layout;
    const [data,setData] = useState([])
    const history = useHistory();
    const columns = [
        {
            title: 'database_name',
            dataIndex: 'database_name',
            key: 'database_name'
        },
        {
            title: 'database_description',
            dataIndex: 'database_description',
            key: 'database_description'
        },
        {
            title: 'is_enabled',
            dataIndex: 'is_enabled',
            key: 'is_enabled',
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        console.log(record.id)
                        axios.get('/api/admin/deleteDatabaseById', {
                            params: {
                                database_id:record.id,
                            }
                        })
                        console.log(record.id)
                        success_delete()
                        history.push('/database')
                    }}>delete</Button>
                </Space>
            ),
        },
        {
            title: 'Init_type',
            key: 'init_type',
            render: (record) => (
                <Space size="middle">
                    <Radio.Group value={operation_type} onChange={e => {
                        setOperation_type(e.target.value);
                    }}>
                        <Radio.Button value="query">query</Radio.Button>
                        <Radio.Button value="trigger">trigger</Radio.Button>
                    </Radio.Group>
                </Space>
            ),
        },
        {
            title: 'Init_Docker',
            key: 'Init',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={()=>{
                        axios.get('/api/admin/initDatabaseDocker', {
                            params: {
                                database_id:record.id,
                                operation_type:operation_type
                            }
                        })
                        success_init();
                    }}>start</Button>
                </Space>
            ),
        }
    ];
    useEffect(()=>{
        const now = Date.now()
        console.log(now, timer)
        if (timer===0||now-timer>3000) {
        axios.get('/api/admin/queryDatabaseList').then((response)=>{
            const temp = response.data
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].is_enabled) {
                    temp[i].is_enabled = 'YES'
                } else {
                    temp[i].is_enabled = 'NO'
                }
            }
            setData(temp)
            setTimer(now)
        })
    }})
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
                            <Button style={{width:"90px"}} type="primary"  onClick={()=>{
                                window.localStorage.current = 'database';
                                history.push('/AddDatabase')
                            }}>Add</Button>,
                            <div style={{height:'20px'}}/>,
                            <Table columns={columns} key="demo1" dataSource={data} />
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}

