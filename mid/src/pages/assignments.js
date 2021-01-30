import React, {useState, useEffect} from "react";
import Guide from "../components/guide";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {Table, Space, Button, Layout} from 'antd';
import logo from './logo.png';
import QueueAnim from 'rc-queue-anim';
import './layout.css';


export default function Assignments() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const {Header, Content, Sider} = Layout;
    const [data, setData] = useState([])
    const history = useHistory();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'assignment_name',
            key: 'name',
            render: text => <a>{text}</a>,
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
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button className='button' onClick={() => {
                        window.localStorage.assignment_ID = record.assignment_id;
                        history.push('questions');
                    }}>details</Button>
                </Space>
            ),
        }
    ];


    useEffect(() => {
        const now = Date.now()
        if (timer===0||now-timer>3000) {
            axios.defaults.withCredentials = true;
            axios.get('/api/user/queryAssigmentList').then((response) => {
                const temp = response.data
                for (var i = 0; i < temp.length; i++) {
                    var newTime = new Date(temp[i].assignment_start_time);
                    temp[i].assignment_start_time = newTime.getFullYear() + '/' + newTime.getMonth() + '/' + newTime.getDate() + ' ' + newTime.getHours() + ':' + newTime.getMinutes()
                    newTime = new Date(temp[i].assignment_end_time);
                    temp[i].assignment_end_time = newTime.getFullYear() + '/' + newTime.getMonth() + '/' + newTime.getDate() + ' ' + newTime.getHours() + ':' + newTime.getMinutes()
                }
                setData(temp)
                setTimer(now)
            })
        }
    })
    return <Layout>
        <Header className="header">
            <img src={logo} style={{height: '45px'}} alt=""/>
        </Header>
        <Layout>
            <Sider style={{width: '200px'}} className="site-layout-content"><Guide/></Sider>
            <Layout style={{padding: '0 24px 24px'}}>
                <Content className="defult_font" style={{height: '680px', margin: '24px 0'}}>
                    <QueueAnim
                        key="demo"
                        type={['top', 'bottom']}
                        duration="1400"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Table columns={columns} key="demo1" dataSource={data}/>,
                            // <div>
                            //     <div style={{display: "inline"}}>
                            //         <div style={{width: "64%", float: "left"}}>
                            //             <List
                            //                 className="comment-list"
                            //                 header={`${commentData.length} replies`}
                            //                 itemLayout="horizontal"
                            //                 dataSource={commentData}
                            //                 renderItem={item => (
                            //                     <li>
                            //                         <Comment
                            //                             actions={[
                            //                                 <Tooltip key="comment-basic-like" title="Like">
                            //                                 <span onClick={() => {
                            //                                     axios.defaults.withCredentials = false;
                            //                                     axios.get('/chat/chat/like', {
                            //                                         params: {
                            //                                             id:item.id
                            //                                         }
                            //                                     })
                            //                                     axios.defaults.withCredentials = true;
                            //                                     const temp=action
                            //                                     temp[item.id]='like'
                            //                                     setAction(temp);
                            //                                     history.push('/assignments');
                            //                                 }}>
                            //                                 {createElement(action[item.id] === 'liked' ? LikeFilled : LikeOutlined)}
                            //                                 <span className="comment-action">{item.like}</span>
                            //                                 </span>
                            //                                 </Tooltip>,
                            //                                 <Tooltip key="comment-basic-dislike" title="Dislike">
                            //                                 <span onClick={() => {
                            //                                     axios.defaults.withCredentials = false;
                            //                                     axios.get('/chat/chat/dislike', {
                            //                                         params: {
                            //                                             id:item.id
                            //                                         }
                            //                                     })
                            //                                     axios.defaults.withCredentials = true;
                            //                                     const temp=action
                            //                                     temp[item.id]='dislike'
                            //                                     setAction(temp);
                            //                                     history.push('/assignments');
                            //                                 }}>
                            //                                 {React.createElement(action[item.id] === 'disliked' ? DislikeFilled : DislikeOutlined)}
                            //                                 <span className="comment-action">{item.dislike}</span>
                            //                                 </span>
                            //                                 </Tooltip>,
                            //                             ]}
                            //                             author={item.name}
                            //                             avatar={item.avator}
                            //                             content={item.comment}
                            //                             datetime={item.time}
                            //                         />
                            //                     </li>
                            //                 )}
                            //             />
                            //             <Comment
                            //                 avatar={
                            //                     <Avatar
                            //                         src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=370025726,1675796957&fm=26&gp=0.jpg"
                            //                         alt="Junior Corporal Morishita"
                            //                     />
                            //                 }
                            //                 content={
                            //                     <div>
                            //                     <Form.Item>
                            //                         <TextArea rows={4} onChange={(e)=>{
                            //                             setCom(e.target.value)
                            //                         }} />
                            //                     </Form.Item>
                            //                     <Form.Item>
                            //                     <Button htmlType="submit" onClick={()=>{
                            //                         axios.defaults.withCredentials = false;
                            //                         axios.get('/chat/chat/add', {
                            //                             params: {
                            //                                 comment:com,
                            //                                 id:1
                            //                             }
                            //                         })
                            //                         axios.defaults.withCredentials = true;
                            //                         history.push('/assignments');
                            //                     }} type="primary">
                            //                     Add Comment
                            //                     </Button>
                            //                     </Form.Item>
                            //                         </div>
                            //                 }
                            //             />
                            //             {/*    评论区*/}
                            //         </div>
                            //         <div style={{width: "34%", float: "right", padding: "25px 25px 0px 0px"}}>
                            //             <div>
                            //                 <div>
                            //                     <Demo/>
                            //                     {/*    变化图标*/}
                            //                 </div>
                            //                 <div style={{height: "40px"}}/>
                            //                 <div>
                            //                     <div className="site-statistic-demo-card">
                            //                         <Row gutter={16}>
                            //                             <Col span={12}>
                            //                                 <Card>
                            //                                     <Statistic
                            //                                         title="Ass completion"
                            //                                         value={11.28}
                            //                                         precision={2}
                            //                                         valueStyle={{color: '#3f8600'}}
                            //                                         prefix={<ArrowUpOutlined/>}
                            //                                         suffix="%"
                            //                                     />
                            //                                 </Card>
                            //                             </Col>
                            //                             <Col span={12}>
                            //                                 <Card>
                            //                                     <Statistic
                            //                                         title="submit ACratio"
                            //                                         value={9.3}
                            //                                         precision={2}
                            //                                         valueStyle={{color: '#cf1322'}}
                            //                                         prefix={<ArrowDownOutlined/>}
                            //                                         suffix="%"
                            //                                     />
                            //                                 </Card>
                            //                             </Col>
                            //                         </Row>
                            //                     </div>
                            //                     {/*  条形图表*/}
                            //                 </div>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}

