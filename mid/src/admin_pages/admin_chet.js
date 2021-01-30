import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import GuideAdmin from "../components/guide_admin";
import axios from 'axios';
import {Comment, Layout, List} from 'antd';
import logo from '../pages/logo.png';
import '../pages/layout.css';
import QueueAnim from "rc-queue-anim";

export default function Admin_chet() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const history = useHistory();
    const { Header,Content,Sider }= Layout;
    const [commentData,setCommentData] = useState([{
        author: '1',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            'okk1'
        ),
        datetime: (
            '2020-1-1'
        ),
    },
        {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                'okk2'
            ),
            datetime: (
                '2020-1-2'
            ),
        }])

    useEffect(()=>{
        const now = Date.now()
        if (timer===0||now-timer>3000) {
            axios.defaults.withCredentials = false;
            axios.get('/chat/chat/list').then((response) => {
                console.log(response.data)
                setCommentData(response.data)
                setTimer(now)
            })
            axios.defaults.withCredentials = true;
        }
    })
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
                            <List
                                className="comment-list"
                                header={`${commentData.length} replies`}
                                itemLayout="horizontal"
                                dataSource={commentData}
                                renderItem={item => (
                                    <li>
                                        <Comment
                                            actions={[<span key="comment-list-reply-to-0" onClick={(e)=>{
                                                axios.defaults.withCredentials = false;
                                                axios.get('/chat/chat/delete', {
                                                    params: {
                                                        id:item.id
                                                    }
                                                })
                                                axios.defaults.withCredentials = true;
                                                history.push('/admin_chet')
                                            }}>delete</span>]}
                                            author={item.name}
                                            avatar={item.avator}
                                            content={item.comment}
                                            datetime={item.time}
                                        />
                                    </li>
                                )}
                            />
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}