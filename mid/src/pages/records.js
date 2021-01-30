import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Guide from "../components/guide";
import axios from 'axios';
import {Table, Layout, Tag, Space, Button} from 'antd';
import logo from './logo.png';
import QueueAnim from 'rc-queue-anim';
import './layout.css';
// import fireworks from 'react-fireworks';

export default function Records() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const { Header,Content,Sider }= Layout;
    const [data,setData] = useState([])
    const history = useHistory();
    const columns = [
        {
            title: 'SID',
            dataIndex: 'record_sid',
            key: 'sid',
        },
        {
            title: 'QuestionID',
            dataIndex: 'record_question_id',
            key: 'q_id',
        },
        {
            title: 'Status',
            dataIndex: 'record_status',
            key: 'status',
            render: tag => {
                let color = 'green';
                if (tag === 'wa') {
                    color = 'red';
                }
                return (
                    <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: 'running_time',
            dataIndex: 'running_time',
            key: 'running_time',
            render: tag => {
                if (tag<0) {
                    tag = tag +400;
                }
                return (
                    <Tag color={'green'} key={tag}>
                        {tag}
                    </Tag>
                );
            }
        },
        {
            title: 'Time',
            dataIndex: 'record_time',
            key: 'time',
        },
        {
            title: 'Detail',
            key: 'detail',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={() => {
                        window.localStorage.recordQuestionId = record.record_question_id;
                        window.localStorage.recordId=record.record_id
                        history.push('record_detail');
                    }}>detail</Button>
                </Space>
            ),
        }
    ];
    useEffect(()=>{
        // fireworks.init(document,{})
        // fireworks.start()
        const now = Date.now()
        console.log(now, timer)
        if (timer===0||now-timer>3000) {
            axios.defaults.withCredentials = true;
            axios.get('/api/user/selectRecordListBySid', {
                params: {
                }
            }).then((response) => {
                const temp = response.data
                for (var k=0; k<temp.length;k++){
                    for (var j=k;j<temp.length;j++){
                        if (temp[k].record_time<temp[j].record_time){
                            const op = temp[k];
                            temp[k] = temp[j];
                            temp[j] = op;
                        }
                    }
                }
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].running_time === -1) {
                        temp[i].running_time = 'not available'
                    }
                    if (temp[i].record_status === 1) {
                        temp[i].record_status = 'ac'
                    } else if(temp[i].record_status === 0){
                        temp[i].record_status = 'running'
                    }
                    else {
                        temp[i].record_status = 'wa'
                    }
                    var newTime = new Date(temp[i].record_time);
                    temp[i].record_time = newTime.getFullYear() + '/' + newTime.getMonth() + '/' + newTime.getDate() + ' ' + newTime.getHours() + ':' + newTime.getMinutes()
                }
                setData(temp)
                setTimer(now)
            })
        }
    })
    return<Layout>
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