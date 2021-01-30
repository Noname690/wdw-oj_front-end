import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import Guide from "../components/guide";
import logo from './logo.png';
import './layout.css';
import {Layout, Card, Button, Tag, Table} from "antd";
import axios from "axios";
import QueueAnim from "rc-queue-anim";
import Cookies from 'js-cookie'
import 'github-markdown-css'
import '../style/otto.css'
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/solarized.css';

export default function Submit() {
    const [leader,setLeader] = useState([])
    const [timer,setTimer] = useState(0)
    const [show] = useState(true)
    const [questionName,setQuestionName] = useState('');
    const [description,setDescription] = useState('');
    const [output,setOutput] = useState([]);
    const [mode,setMode] = useState('postgresql');
    const { Header,Content,Sider }= Layout;
    const id = window.localStorage.question_ID;
    // const { Option } = Select;
    const history = useHistory();

    const lead_columns = [
        {
            title: 'user_rank',
            dataIndex: 'user_rank',
            key: 'user_rank',
            render: tag => {
                let color = 'blue';
                if (tag<4) {
                    color = 'red';
                }else if (tag<11){
                    color = 'green'
                }
                return (
                    <Tag color={color} key={tag}>
                        {tag}
                    </Tag>
                );
            }
        },
        {
            title: 'return_record_sid',
            dataIndex: 'return_record_sid',
            key: 'return_record_sid'
        },
        {
            title: 'return_running_time',
            dataIndex: 'return_running_time',
            key: 'return_running_time',
            render: text => <a>{text}</a>
        },
    ];
    useEffect(()=>{
        const now = Date.now()
        console.log(now, timer)
        if (timer===0) {
            axios.get('/api/user/selectQuestionsById', {
                params: {
                    question_id: id
                }
            }).then((response) => {
                setQuestionName(response.data.question_name);
                setDescription(response.data.question_description)
                setMode(response.data.question_sql_type)
                setOutput(response.data.question_output)
                setTimer(now)
            })
            axios.get('/api/user/getLeaderBoardByQid',{params:{
                    question_id:id
                }}).then((response) => {
                setLeader(response.data.data)
                setTimer(now)
            })
        }
    })
    return<Layout>
        <Header  className="header">
            <img src={logo} style={{height:'45px'}} alt= "" />
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-content"><Guide/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'700px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['right', 'left']}
                        duration = "2000"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                    <Tag  color="volcano">{mode}</Tag>,
                            <div style={{height:'10px'}}/>,
                    <Card key="demo1" title="question name"  >
                        <div dangerouslySetInnerHTML={{ __html: questionName }} />
                    </Card>,
                    <div style={{padding:'3px'}}/>,
                    <Card key="demo2" title="question description">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </Card>,
                    <div style={{padding:'3px'}}/>,
                    <Card key="demo3" title="output">
                        <div dangerouslySetInnerHTML={{ __html: output }} />
                    </Card>,
                    <div style={{height:'10px'}}/>,
                    <div style={{padding:'3px'}}/>,
                            <CodeMirror
                                value='select * from movies'
                                options={{
                                    // lineNumbers:true,
                                    // mode:{name:"text/javascript"},
                                    // extraKeys:{"Ctrl":"autocomplete"},
                                    // autofocus:true,
                                    // styleActiveLine:true,
                                    // lineWrapping:true,
                                    // foldGutter:true,
                                    // gutters:['CodeMirror-linenumbers','CodeMirror-foldgutter']
                                    lineNumbers: true,                     //显示行号
                                    mode: {name: "text/x-mysql"},          //定义mode
                                    extraKeys: {"Ctrl": "autocomplete"},   //自动提示配置
                                    theme: "solarized",
                                }}/>
                            ,
                    // <Select key="demo5" defaultValue="postgreSQL" style={{ width: 120,left:800 ,top:15}} onChange={(value)=>{
                    //     console.log(this.refs.editor.outputHTML)
                    //     setMode(value)
                    // }}>
                    //     <Option value="sqlite">sqlite</Option>
                    //     <Option value="postgreSQL">postgresql</Option>
                    // </Select>,
                    <Button key="demo6" style={{ width: 120,left:800 ,top:15}} type="primary" className='button' onClick={()=>{
                        axios.defaults.withCredentials = true;
                        const params = new URLSearchParams();
                        console.log(id)
                        console.log(window.localStorage.submitCode)
                        params.append('question_id',id)
                        params.append('code',window.localStorage.submitCode)
                        console.log(Cookies.get('JSESSIONID'))
                        axios.post('/api/user/addRecord',params)
                        window.localStorage.current='record'
                        console.log(window.localStorage.submitCode)
                        history.push('/records');
                    }}>submit</Button>,
                            <div style={{height:'20px'}} />,
                            <div>leader board</div>,
                            <Table columns={lead_columns} key="demo2" dataSource={leader}/>,
                            <div style={{height:'20px'}} />,
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}
