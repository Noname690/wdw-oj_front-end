import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import GuideTeacher from "../components/guide_teacher";
import logo from '../pages/logo.png';
import '../pages/layout.css';
import {Layout, Card, Input, Button, Select, InputNumber, Checkbox, Badge, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import QueueAnim from "rc-queue-anim";
import 'github-markdown-css'
import '../style/otto.css'
import Editor from "../components/editor";
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/solarized.css';




export default function AddQuestion() {
    const [timer,setTimer] = useState(0)
    const [file1,setFile1] = useState('')
    const [file2,setFile2] = useState('')
    const [target_table,setTarget_table] = useState('')
    const [test_config,setTest_config] = useState('')
    const [data,setData] = useState([])
    const [database_id,setDatabase_id] = useState()
    const [show] = useState(true)
    const [questionName,setQuestionName] = useState('');
    const [index,setIndex] = useState(3)
    const [isvisible,setIsvisible] = useState('')
    const [operate,setOperate] = useState('trigger');
    const [isOrder,setIsOrder] = useState('')
    const [questionType,setQuestionType] = useState('postgresql')
    const { Header,Content,Sider }= Layout;
    const { Option } = Select;
    const history = useHistory();
    const props1 = {
        action: '/api/admin/files/uploadToRemoteDatabase',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
                setFile1(file.response.data);
            }
        },
        defaultFileList: [],}
    const props2 = {
        action: '/api/admin/files/uploadToRemoteDatabase',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
                setFile2(file.response.data);
            }
        },
        defaultFileList: [],}
    useEffect(()=>{
        const now = Date.now()
        if (timer===0) {
            axios.get('/api/admin/queryDatabaseList').then((response)=>{
                setData(response.data)
                setTimer(now)
            })
        }})
    return<Layout>
        <Header  className="header">
            <img src={logo} style={{height:'45px'}} alt= "" />
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-content"><GuideTeacher/></Sider>
            <Layout style={{padding:'0 24px 24px'}}>
                <Content className="defult_font" style={{ height:'700px', margin: '24px 0' }}>
                    <QueueAnim
                        key="demo"
                        type={['right', 'left']}
                        duration = "2000"
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {show ? [
                            <Card key="demo1" title="add Question">
                                <div><Badge status="processing" text="question corresponding database" /></div>
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value)=>{
                                        setDatabase_id(value)
                                    }}
                                >
                                    {
                                        data.map((v)=>(
                                            <Option value={v.database_id}>{v.database_name}</Option>
                                        ))
                                    }
                                </Select>
                                <div style={{height:"10px"}}/>
                                <div><Badge status="processing" text="question name" /></div>
                                <Input style={{width:"200px"}} placeholder="Question Name" onChange={value=>{
                                    setQuestionName(value.target.value)
                                }}/>
                                <div style={{height:"10px"}}/>
                                <div style={{padding:'3px'}}/>
                                <Card title="question description"><Editor default={''} usage="description"/></Card>
                                <div style={{height:"5px"}}/>
                                <div style={{padding:'3px'}}/>
                                <Card title="output"><Editor  default={''} usage="output"/></Card>
                                <div style={{height:"5px"}}/>
                                <div style={{padding:'3px'}}/>
                                <Card title="standard answer"><CodeMirror
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
                                    }}/></Card>
                                <div style={{height:"20px"}}/>
                                <div><Badge status="processing" text="question index" /></div>
                                <InputNumber min={1} max={10} defaultValue={3} onChange={(value => {
                                    setIndex(value)
                                })} />
                                <div style={{height:"20px"}}/>
                                <div><Badge status="processing" text="question type" /></div>
                                <Select key="demo5" defaultValue="trigger"  onChange={(value)=>{
                                    setOperate(value)
                                }}>
                                    <Option value="query">query</Option>
                                    <Option value="trigger">trigger</Option>
                                </Select>
                                <Select key="demo5" defaultValue="sqlite"  onChange={(value)=>{
                                    setQuestionType(value)
                                }}>
                                    <Option value="sqlite">sqlite</Option>
                                    <Option value="postgresql">postgresql</Option>
                                    <Option value="mysql">mysql</Option>
                                </Select>
                                <div style={{height:"20px"}}/>
                                <Checkbox onChange={e => {
                                    if (e.target.checked){
                                        setIsOrder(true)
                                    }else
                                        setIsOrder(false)
                                }}>Is there an order to the answer</Checkbox>
                                <div style={{height:"20px"}}/>
                                <Checkbox onChange={e => {
                                    if (e.target.checked){
                                        setIsvisible(true)
                                    }else
                                        setIsvisible(false)
                                }}>Are students visible</Checkbox>
                                <div style={{height:"20px"}}/>
                                <div><Badge status="processing" text="answer table file id" /></div>
                                <Upload {...props1}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                <div><Badge status="processing" text="test data file id" /></div>
                                <Upload {...props2}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                <Input style={{width:"200px"}} placeholder="target table" onChange={value=>{
                                    setTarget_table(value.target.value)
                                }}/>
                                <Input style={{width:"200px"}} placeholder="test config" onChange={value=>{
                                    setTest_config(value.target.value)
                                }}/>
                                <Button style={{width:"90px"}} type="primary"  onClick={()=>{
                                    // const params = new URLSearchParams();
                                    // params.append('database_id',1)
                                    // params.append('question_name',questionName)
                                    // params.append('question_of_assignment',window.localStorage.assignment_ID)
                                    // params.append('question_description',window.localStorage.description)
                                    // params.append('question_output',window.localStorage.output)
                                    // params.append('question_index',index)
                                    // params.append('question_standard_ans',window.localStorage.code)
                                    // params.append('is_visible',isvisible)
                                    // params.append('operation_type',operate)
                                    // params.append('is_order',isOrder)
                                    // axios.post('api/admin/addQuestion',{
                                    //         database_id:1,
                                    //         question_name:questionName,
                                    //         question_of_assignment:window.localStorage.assignment_ID,
                                    //         question_description:window.localStorage.description,
                                    //         question_output:window.localStorage.output,
                                    //         question_index:index,
                                    //         question_standard_ans:window.localStorage.code,
                                    //         is_visible:isvisible,
                                    //         operation_type:operate,
                                    //         is_order:isOrder,
                                    //         question_sql_type:"sqlite",
                                    //     })
                                    axios({
                                        method:'post',
                                        url:'api/admin/addQuestionTrigger'+'?ans_table_file_id='+file1+'&test_data_file_id='+file2+'&target_table='+target_table+'&test_config='+test_config,
                                        data:{
                                            database_id:database_id,
                                            question_name:questionName,
                                            question_of_assignment:window.localStorage.assignment_ID,
                                            question_description:window.localStorage.description,
                                            question_output:window.localStorage.output,
                                            question_index:index,
                                            question_standard_ans:window.localStorage.submitCode,
                                            is_visible:isvisible,
                                            operation_type:operate,
                                            is_order:isOrder,
                                            question_sql_type:questionType,
                                        }
                                    })
                                    window.localStorage.current = 'assignments';
                                    history.push('/teacherQuestion')
                                }}>submit</Button>
                            </Card>
                        ] : null}
                    </QueueAnim>
                </Content>
            </Layout>
        </Layout>
    </Layout>
}
