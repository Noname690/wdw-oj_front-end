import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import GuideTeacher from "../components/guide_teacher";
import logo from '../pages/logo.png';
import '../pages/layout.css';
import {Layout, Card, Input, Button, DatePicker, Checkbox, Badge} from "antd";
import axios from "axios";
import QueueAnim from "rc-queue-anim";
import 'github-markdown-css'
import moment from 'moment';


export default function UpdateAssignment() {
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const [assignmentName,setAssignmentName] = useState()
    const [start,setStart] = useState('');
    const [deadline,setDeadline] = useState('');
    const [isVisible,setIsvisible] = useState(0);
    const [description,setDescription] = useState('');
    const { Header,Content,Sider }= Layout;
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const history = useHistory();

    useEffect(()=>{
        const now = Date.now()
        if (timer===0) {
            axios.get('/api/user/selectAssignmentById', {
                params: {
                    question_id: window.localStorage.assignment_id
                }
            }).then((response) => {
                setAssignmentName(response.data.assignment_name)
                setDescription(response.data.assignment_description)
                setIsvisible(response.data.is_visible)
                setTimer(now)
            })
        }})

    return<Layout>
        <Header  className="header">
            <img src={logo} style={{height:'45px'}} alt= "" />
        </Header>
        <Layout>
            <Sider width={200}
                   className="site-layout-content">
                <GuideTeacher/>
            </Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'700px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['right', 'left']}
                        duration = "2000"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Card key="demo1" title="update Assignment"  >
                                <div><Badge status="processing" text="Assignment name" /></div>
                                <Input style={{width:"200px"}} placeholder={assignmentName} onChange={value=>{
                                    setAssignmentName(value.target.value)
                                }}/>
                                <div style={{height:"20px"}}/>
                                <div><Badge status="processing" text="assignment continue time" /></div>
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    showTime
                                    format="YYYY/MM/DD HH:mm:ss"
                                    onChange={(dateStrings)=>{
                                        if(dateStrings.length>0){
                                            setStart(dateStrings[0].unix());
                                            setDeadline(dateStrings[1].unix())
                                        }
                                    }}
                                />
                                <div style={{height:"20px"}}/>
                                <TextArea className="submit_text" key="demo4" rows={5} placeholder={description} onChange={value=>{
                                    setDescription(value.target.value)
                                }}/>
                                <div style={{height:"20px"}}/>
                                <Checkbox onChange={e => {
                                    if (e.target.checked){
                                        setIsvisible(1)
                                    }else
                                        setIsvisible(0)
                                }}>Are students visible</Checkbox>
                                <div style={{height:"20px"}}/>
                                <Button style={{width:"90px"}} type="primary"  onClick={()=>{
                                    axios({
                                        method:'post',
                                        url:'api/admin/updateAssignment',
                                        data:{
                                            assignment_name:assignmentName,
                                            assignment_description:description,
                                            assignment_start_time:start,
                                            assignment_end_time:deadline,
                                            is_visible:isVisible
                                        }
                                    })
                                    window.localStorage.current = 'assignments';
                                    history.push('/teacher_assignment')
                                }}>submit</Button>
                            </Card>
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}
